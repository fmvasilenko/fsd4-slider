import { SliderHandle } from './sliderHandleView';
import { SliderLimitView } from './sliderLimitView';
import { SliderDefaultValueLabel } from './sliderDefaultValueLabelView';
import { SliderRangeLineView } from './sliderRangeLineView';
import { SliderConfig } from '../sliderConfig/sliderConfig';
import { SliderState } from '../sliderState/sliderState';

enum Side { Left, Right }
enum Type { MinVal, MaxVal }

class SliderView {
  private CLASSES: SliderClasses;

  private config: SliderConfig;

  private state: SliderState;

  private ROOT: HTMLElement;

  private LEFT_HANDLE: SliderHandle;

  private RIGHT_HANDLE: SliderHandle;

  private RANGE_LINE: SliderRangeLineView;

  private MIN_VALUE_LABEL: SliderLimitView;

  private MAX_VALUE_LABEL: SliderLimitView;

  private DEFAULT_VALUES: SliderDefaultValueLabel[] = [];

  constructor(root: HTMLElement, config: SliderConfig, state: SliderState) {
    this.CLASSES = require('../sliderClasses.json');
    this.config = config;
    this.state = state;

    this.ROOT = root;
    this.ROOT.classList.add(this.CLASSES.SLIDER);
    this.switchVertical();

    this.LEFT_HANDLE = new SliderHandle(this.ROOT, this.config, this.state, Side.Left);
    this.RIGHT_HANDLE = new SliderHandle(this.ROOT, this.config, this.state, Side.Right);

    this.RANGE_LINE = new SliderRangeLineView(this.ROOT, this.config);

    this.MIN_VALUE_LABEL = new SliderLimitView(this.ROOT, this.config, this.state, Type.MinVal);
    this.MAX_VALUE_LABEL = new SliderLimitView(this.ROOT, this.config, this.state, Type.MaxVal);

    const defaultValues = this.config.defaultValues.get() as number[] | string[];
    defaultValues.forEach((value: string | number, index: number) => {
      this.DEFAULT_VALUES[index] = new SliderDefaultValueLabel(this.ROOT, this.config, this.state, index);
    });

    this.config.defaultValues.addSubscriber(this.checkDefaultValues.bind(this));
    this.config.isVertical.addSubscriber(this.switchVertical.bind(this));

    this.bindEventListeners();
  }

  private checkDefaultValues() {
    this.DEFAULT_VALUES.forEach((value: SliderDefaultValueLabel) => {
      value.remove();
    });
    this.DEFAULT_VALUES.length = 0;

    const defaultValues = this.config.defaultValues.get() as number[] | string[];
    defaultValues.forEach((value: string | number, index: number) => {
      this.DEFAULT_VALUES[index] = new SliderDefaultValueLabel(this.ROOT, this.config, this.state, index);
    });
  }

  private switchVertical() {
    if (this.config.isVertical.get() === true) this.ROOT.classList.add(this.CLASSES.SLIDER_VERTICAL);
    else this.ROOT.classList.remove(this.CLASSES.SLIDER_VERTICAL);
  }

  private bindEventListeners() {
    this.ROOT.addEventListener('click', this.clickHandler.bind(this));
  }

  private clickHandler(event: MouseEvent) {
    if (this.config.isRange.get() === false
      && event.target === this.ROOT) this.state.leftHandlePosition.set(this.calculatePosition(event));
  }

  private calculatePosition(event: MouseEvent): number {
    return this.config.isVertical.get() === true
      ? this.calculateVerticalPosition(event.clientY)
      : this.calculateHorizontalPosition(event.clientX);
  }

  private calculateHorizontalPosition(x: number): number {
    /**
     * function receives x mouse coordinate
     * and returns handle position on the scale, normalized from 0 to 1
     */

    const scaleBeginning = this.ROOT.getBoundingClientRect().left;
    const length = this.ROOT.offsetWidth;

    if (x < scaleBeginning) return 0;
    if (x > scaleBeginning + length) return 1;
    return (x - scaleBeginning) / length;
  }

  private calculateVerticalPosition(y: number): number {
    /**
     * function receives y mouse coordinate
     * and returns handle position on the scale, normalized from 0 to 1
     */

    const length = this.ROOT.offsetHeight;
    const scaleBeginning = this.ROOT.getBoundingClientRect().top + length;

    if (y < scaleBeginning - length) return 1;
    if (y > scaleBeginning) return 0;
    return (scaleBeginning - y) / length;
  }
}

export { SliderView };
