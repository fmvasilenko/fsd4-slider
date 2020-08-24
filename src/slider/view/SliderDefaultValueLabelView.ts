import { SliderConfig } from '../sliderConfig/SliderConfig';
import { SliderState } from '../sliderState/SliderState';

class SliderDefaultValueLabel {
  private CONTAINER: HTMLElement;

  private config: SliderConfig;

  private state: SliderState;

  private CLASSES: SliderClasses;

  private ROOT: HTMLElement;

  private LABEL: HTMLElement;

  private index: number;

  private updateValueLink: Function;

  private updateShiftLink: Function;

  private switchLink: Function;

  private switchVerticalLink: Function;

  constructor(container: HTMLElement, config: SliderConfig, state: SliderState, index: number) {
    this.CONTAINER = container;
    this.config = config;
    this.state = state;
    this.index = index;
    this.CLASSES = require('../sliderClasses.json');
    this.ROOT = this.createRootElement();
    this.LABEL = this.createLabel();

    this.updateValue();
    this.updateShift();
    this.switch();

    this.updateValueLink = this.updateValue.bind(this);
    this.updateShiftLink = this.updateShift.bind(this);
    this.switchLink = this.switch.bind(this);
    this.switchVerticalLink = this.switchVertical.bind(this);

    this.config.defaultValues.addSubscriber(this.updateValueLink);
    this.config.defaultValues.addSubscriber(this.updateShiftLink);
    this.config.hasDefaultValues.addSubscriber(this.switchLink);
    this.config.isVertical.addSubscriber(this.switchVerticalLink);
    this.config.isVertical.addSubscriber(this.updateShiftLink);

    this.bindEventListeners();
  }

  public remove() {
    this.config.defaultValues.removeSubscriber(this.updateValueLink);
    this.config.defaultValues.removeSubscriber(this.updateShiftLink);
    this.config.hasDefaultValues.removeSubscriber(this.switchLink);
    this.config.isVertical.removeSubscriber(this.switchVerticalLink);
    this.config.isVertical.removeSubscriber(this.updateShiftLink);
    this.ROOT.remove();
  }

  private createRootElement(): HTMLElement {
    const root = document.createElement('div');

    root.classList.add(this.CLASSES.DEFAULT_VALUE);
    if (this.config.isVertical.get() === true) root.classList.add(this.CLASSES.DEFAULT_VALUE_VERTICAL);

    return root;
  }

  private createLabel(): HTMLElement {
    const label = document.createElement('div');

    label.classList.add(`${this.CLASSES.DEFAULT_VALUE_LABEL}`);
    if (this.config.isVertical.get() === true) label.classList.add(`${this.CLASSES.DEFAULT_VALUE_LABEL_VERTICAL}`);

    this.ROOT.appendChild(label);
    return label;
  }

  private updateShift() {
    const defaultValues = this.config.defaultValues.get() as number[] | string[];
    const shift = (100 * this.index) / (defaultValues.length - 1);

    if (this.config.isVertical.get() === true) this.ROOT.style.bottom = `${shift}%`;
    else this.ROOT.style.left = `${shift}%`;
  }

  private updateValue() {
    const defaultValues = this.config.defaultValues.get() as number[] | string[];
    this.LABEL.innerHTML = `${defaultValues[this.index]}`;
  }

  private switch() {
    if (this.config.hasDefaultValues.get() === true) this.CONTAINER.appendChild(this.ROOT);
    else this.ROOT.remove();
  }

  private switchVertical(value: boolean) {
    if (value === true) {
      this.ROOT.style.left = '';
      this.ROOT.classList.add(this.CLASSES.DEFAULT_VALUE_VERTICAL);
      this.LABEL.classList.add(this.CLASSES.DEFAULT_VALUE_LABEL_VERTICAL);
    } else {
      this.ROOT.style.top = '';
      this.ROOT.classList.remove(this.CLASSES.DEFAULT_VALUE_VERTICAL);
      this.LABEL.classList.remove(this.CLASSES.DEFAULT_VALUE_LABEL_VERTICAL);
    }
  }

  private bindEventListeners() {
    this.ROOT.addEventListener('click', this.clickHandler.bind(this));
  }

  private clickHandler() {
    if (this.config.isRange.get() === false) {
      const defaultValues = this.config.defaultValues.get() as number[] | string[];
      const position = this.index / (defaultValues.length - 1);
      this.state.leftHandlePosition.set(position);
    }
  }
}

export { SliderDefaultValueLabel };
