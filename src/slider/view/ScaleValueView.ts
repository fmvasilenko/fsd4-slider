/* eslint-disable class-methods-use-this */
class ScaleValueView {
  private classes: Classes;

  private container: HTMLElement;

  private index: number;

  private pointsNumber: number;

  private root: HTMLElement;

  private label: HTMLElement;

  private shift: number;

  private isRange: boolean;

  private externalClickSubscriber: Function = () => {};

  constructor(container: HTMLElement, state: State, index: number, pointsNumber: number) {
    this.classes = require('../slider.classes.json');
    this.container = container;
    this.index = index;
    this.pointsNumber = pointsNumber;
    this.root = this.createRoot();
    this.label = this.createLabel();
    this.shift = 0;
    this.isRange = false;

    this.update(state);
    this.switch(state);
    this.switchVertical(state);
    this.bindEventListeners();
  }

  public setClickSubscriber(subscriber: Function) {
    this.externalClickSubscriber = subscriber;
  }

  public switchIsRange(state: State) {
    const { isRange } = state;
    this.isRange = isRange;
  }

  public switch(state: State) {
    const { scaleDisplayed } = state;

    if (scaleDisplayed) this.container.appendChild(this.root);
    else this.root.remove();
  }

  public switchVertical(state: State) {
    const { isVertical } = state;

    if (isVertical) {
      this.root.style.left = '';
      this.root.style.bottom = `${this.shift * 100}%`;
      this.root.classList.add(this.classes.scaleValueVertical);
      this.label.classList.add(this.classes.scaleValueLabelVertical);
    } else {
      this.root.style.bottom = '';
      this.root.style.left = `${this.shift * 100}%`;
      this.root.classList.remove(this.classes.scaleValueVertical);
      this.label.classList.remove(this.classes.scaleValueLabelVertical);
    }
  }

  public remove() {
    this.root.remove();
  }

  private createRoot() {
    const root = document.createElement('div');
    root.classList.add(this.classes.scaleValue);
    return root;
  }

  private createLabel() {
    const label = document.createElement('div');
    label.classList.add(this.classes.scaleValueLabel);
    this.root.appendChild(label);
    return label;
  }

  private update(state: State) {
    const { minValue, maxValue } = state;
    const range = maxValue - minValue;
    const pointValue = this.calculatePointValue(state);

    this.shift = (pointValue - minValue) / range;
    this.label.innerHTML = `${pointValue}`;
  }

  private calculatePointValue(state: State) {
    const { minValue, maxValue } = state;
    const range = maxValue - minValue;
    return this.roundPointValue((range / (this.pointsNumber - 1)) * this.index, state);
  }

  private roundPointValue(normPointValue: number, state: State) {
    const { step, minValue } = state;
    const accuracy = normPointValue % step;
    return normPointValue - accuracy + minValue;
  }

  private bindEventListeners() {
    this.root.addEventListener('click', this.clickHandler.bind(this));
  }

  private clickHandler() {
    if (!this.isRange) this.externalClickSubscriber(this.shift);
  }
}

export { ScaleValueView };
