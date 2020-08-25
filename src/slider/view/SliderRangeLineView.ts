import { SliderConfig } from '../sliderConfig/SliderConfig';

class SliderRangeLineView {
  private CLASSES: SliderClasses;

  private CONTAINER: HTMLElement;

  private config: SliderConfig;

  private ROOT: HTMLElement;

  constructor(container: HTMLElement, config: SliderConfig) {
    this.CLASSES = require('../sliderClasses.json');
    this.CONTAINER = container;
    this.config = config;
    this.ROOT = this.createRootElement();

    this.render();
    this.switchVertical();

    this.config.leftHandleValue.addSubscriber(this.render.bind(this));
    this.config.rightHandleValue.addSubscriber(this.render.bind(this));
    this.config.isVertical.addSubscriber(this.render.bind(this));
    this.config.isVertical.addSubscriber(this.switchVertical.bind(this));
    this.config.isRange.addSubscriber(this.render.bind(this));
  }

  private createRootElement() {
    const root = document.createElement('div');
    root.classList.add(this.CLASSES.RANGE_LINE);
    this.CONTAINER.appendChild(root);
    return root;
  }

  private switchVertical() {
    if (this.config.isVertical.get() === true) this.ROOT.classList.add(this.CLASSES.RANGE_LINE_VERTICAL);
    else this.ROOT.classList.remove(this.CLASSES.RANGE_LINE_VERTICAL);
  }

  private render() {
    if (this.config.isVertical.get() === true) this.renderVertical();
    else this.renderHorizontal();
  }

  private renderVertical() {
    this.ROOT.style.left = '';
    this.ROOT.style.right = '';

    if (this.config.isRange.get() === true) {
      this.ROOT.style.top = `${this.calculateRightShift()}%`;
      this.ROOT.style.bottom = `${this.calculateLeftShift()}%`;
    } else {
      this.ROOT.style.top = `${100 - this.calculateLeftShift()}%`;
      this.ROOT.style.bottom = '0%';
    }
  }

  private renderHorizontal() {
    this.ROOT.style.top = '';
    this.ROOT.style.bottom = '';

    if (this.config.isRange.get() === true) {
      this.ROOT.style.left = `${this.calculateLeftShift()}%`;
      this.ROOT.style.right = `${this.calculateRightShift()}%`;
    } else {
      this.ROOT.style.left = '0%';
      this.ROOT.style.right = `${100 - this.calculateLeftShift()}%`;
    }
  }

  private calculateLeftShift(): number {
    return 100 * this.calculatePosition(this.config.leftHandleValue.get() as number);
  }

  private calculateRightShift(): number {
    const rightHandleValue = this.config.rightHandleValue.get() as number;
    const position = this.calculatePosition(rightHandleValue);

    return 100 - position * 100;
  }

  private calculatePosition(value: number): number {
    const minValue = this.config.minValue.get() as number;
    const maxValue = this.config.maxValue.get() as number;
    const defaultValues = this.config.defaultValues.get() as number[] | string[];

    return this.config.hasDefaultValues.get() === true
      ? value / (defaultValues.length - 1)
      : (value - minValue) / (maxValue - minValue);
  }
}

export { SliderRangeLineView };
