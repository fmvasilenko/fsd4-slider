/* eslint-disable class-methods-use-this */
class ScaleValueView {
  private classes: Classes;

  private container: HTMLElement;

  private index: number;

  private pointsNumber: number;

  private root: HTMLElement;

  private label: HTMLElement;

  private shift: number;

  private externalClickSubscriber: Function = () => {};

  constructor(container: HTMLElement, state: State, index: number, pointsNumber: number) {
    this.classes = require('../slider.classes.json');
    this.container = container;
    this.index = index;
    this.pointsNumber = pointsNumber;
    this.root = this.createRoot();
    this.label = this.createLabel();
    this.shift = 0;

    this.update(state);
    this.switchLabel(state);
    this.switchVertical(state);
    this.bindEventListeners();
  }

  public setClickSubscriber(subscriber: Function) {
    this.externalClickSubscriber = subscriber;
  }

  public switchLabel(state: State) {
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
    const { minValue, maxValue, step } = state;
    const range = maxValue - minValue;
    const stepsNumber = Math.floor(range / step);

    const pointValue = Math.floor(stepsNumber / (this.pointsNumber - 1)) * step * this.index;
    this.shift = pointValue / range;

    this.label.innerHTML = `${pointValue + minValue}`;
  }

  private bindEventListeners() {
    this.root.addEventListener('click', this.clickHandler.bind(this));
  }

  private clickHandler() {
    this.externalClickSubscriber(this.shift);
  }
}

export { ScaleValueView };
