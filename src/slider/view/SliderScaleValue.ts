import { SliderConfig } from '../sliderConfig/SliderConfig';
import { SliderState } from '../sliderState/SliderState';

class SliderScaleValue {
  private container: HTMLElement;

  private config: SliderConfig;

  private state: SliderState;

  private index: number;

  private pointsNumber: number;

  private classes: SliderClasses;

  private root: HTMLElement;

  private label: HTMLElement;

  private switchLink: Function;

  private switchVerticalLink: Function;

  private shift: number;

  constructor(container: HTMLElement, config: SliderConfig, state: SliderState, index: number, pointsNumber: number) {
    this.container = container;
    this.config = config;
    this.state = state;
    this.index = index;
    this.pointsNumber = pointsNumber;
    this.classes = require('../sliderClasses.json');
    this.root = this.createRoot();
    this.label = this.createLabel();
    this.shift = 0;

    this.switchLink = this.switch.bind(this);
    this.switchVerticalLink = this.switchVertical.bind(this);

    this.config.limitsDisplayed.addSubscriber(this.switchLink);
    this.config.isVertical.addSubscriber(this.switchVerticalLink);

    this.switch(this.config.limitsDisplayed.get());
    this.bindEventListeners();
    this.update();
  }

  public setShift(shift: number) {
    if (shift > 100) this.shift = 1;
    else if (shift < 0) this.shift = 0;
    else this.shift = shift / 100;

    if (this.config.isVertical.get() === true) this.root.style.bottom = `${this.shift * 100}%`;
    else this.root.style.left = `${this.shift * 100}%`;
  }

  public setValue(value: number) {
    this.label.innerHTML = `${value}`;
  }

  public remove() {
    this.config.limitsDisplayed.removeSubscriber(this.switchLink);
    this.config.isVertical.removeSubscriber(this.switchVerticalLink);
    this.root.remove();
  }

  private update() {
    const range = this.config.maxValue.get() - this.config.minValue.get();
    let pointValue = (range / (this.pointsNumber - 1)) * this.index;

    const accuracy = pointValue % this.config.step.get();
    pointValue -= accuracy;
    if (this.index !== this.pointsNumber - 1 && accuracy > this.config.step.get() / 2) pointValue += this.config.step.get();

    this.shift = pointValue / range;

    this.label.innerHTML = `${this.config.minValue.get() + pointValue}`;

    if (this.config.isVertical.get() === true) this.root.style.bottom = `${this.shift * 100}%`;
    else this.root.style.left = `${this.shift * 100}%`;
  }

  private createRoot() {
    const root = document.createElement('div');

    root.classList.add(this.classes.SCALE_VALUE);
    if (this.config.isVertical.get() === true) root.classList.add(this.classes.SCALE_VALUE_VERTICAL);

    return root;
  }

  private createLabel() {
    const label = document.createElement('div');

    label.classList.add(`${this.classes.SCALE_VALUE_LABEL}`);
    if (this.config.isVertical.get() === true) label.classList.add(`${this.classes.SCALE_VALUE_LABEL_VERTICAL}`);

    this.root.appendChild(label);
    return label;
  }

  private switch(value: boolean) {
    if (value === true && this.config.hasDefaultValues.get() === false) this.container.appendChild(this.root);
    else this.root.remove();
  }

  private switchVertical(value: boolean) {
    if (value === true) {
      this.root.style.left = '';
      this.root.classList.add(this.classes.SCALE_VALUE_VERTICAL);
      this.label.classList.add(this.classes.SCALE_VALUE_LABEL_VERTICAL);
    } else {
      this.root.style.top = '';
      this.root.classList.remove(this.classes.SCALE_VALUE_VERTICAL);
      this.label.classList.remove(this.classes.SCALE_VALUE_LABEL_VERTICAL);
    }

    this.update();
  }

  private bindEventListeners() {
    this.root.addEventListener('click', this.clickHandler.bind(this));
  }

  private clickHandler() {
    if (this.config.isRange.get() === false) {
      this.state.leftHandlePosition.set(this.shift);
    }
  }
}

export { SliderScaleValue };
