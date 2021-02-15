import autobind from 'autobind-decorator';
import classes from '../slider.classes';

class ScaleValueView {
  private container: HTMLElement;

  private index: number;

  private pointsNumber: number;

  private root: HTMLElement;

  private label: HTMLElement;

  private shift: number;

  private externalClickSubscriber: Function = () => {};

  constructor(container: HTMLElement, state: State, index: number, pointsNumber: number) {
    this.container = container;
    this.index = index;
    this.pointsNumber = pointsNumber;
    this.root = ScaleValueView.createRoot();
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
      this.root.classList.add(classes.scaleValueVertical);
      this.label.classList.add(classes.scaleValueLabelVertical);
    } else {
      this.root.style.bottom = '';
      this.root.style.left = `${this.shift * 100}%`;
      this.root.classList.remove(classes.scaleValueVertical);
      this.label.classList.remove(classes.scaleValueLabelVertical);
    }
  }

  public remove() {
    this.root.remove();
  }

  private static createRoot() {
    const root = document.createElement('div');
    root.classList.add(classes.scaleValue);
    return root;
  }

  private createLabel() {
    const label = document.createElement('div');
    label.classList.add(classes.scaleValueLabel);
    this.root.appendChild(label);
    return label;
  }

  private update(state: State) {
    const { min, max, step } = state;
    const range = max - min;
    const stepsNumber = Math.floor(range / step);

    const pointValue = Math.floor(stepsNumber / (this.pointsNumber - 1)) * step * this.index;
    this.shift = pointValue / range;

    this.label.innerHTML = `${pointValue + min}`;

    if (this.index > this.pointsNumber) {
      this.shift = 1;
      this.label.innerHTML = `${max}`;
    }
  }

  private bindEventListeners() {
    this.root.addEventListener('click', this.clickHandler);
  }

  @autobind
  private clickHandler(event: Event) {
    event.stopPropagation();
    this.externalClickSubscriber(this.shift);
  }
}

export { ScaleValueView };
