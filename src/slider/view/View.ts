/* eslint-disable object-curly-newline */
import autobind from 'autobind-decorator';
import { HandleView, HandleType } from './HandleView';
import { RangeLineView } from './RangeLineView';
import { ScaleValueView } from './ScaleValueView';
import classes from '../slider.classes';
import { Observable } from '../observable/Observable';

const POINTS_NUMBER_LIMIT = 10;

class View {
  private root: HTMLElement;

  private firstHandle: HandleView;

  private secondHandle: HandleView;

  private rangeLine: RangeLineView;

  private scaleValues: ScaleValueView[] = [];

  private scaleSubscribers: Observable;

  private isVertical = false;

  constructor(container: HTMLElement) {
    this.root = View.createRoot(container);
    this.firstHandle = new HandleView(this.root, HandleType.First);
    this.secondHandle = new HandleView(this.root, HandleType.Second);
    this.rangeLine = new RangeLineView(this.root);
    this.scaleSubscribers = new Observable();
    this.bindEventlisteners();
  }

  @autobind
  public updateIsRange(state: State) {
    this.secondHandle.switchHandle(state);
    this.rangeLine.render(state);
  }

  @autobind
  public updateIsVertical(state: State) {
    this.isVertical = state.isVertical;
    this.switchVertical(state);
    this.firstHandle.switchVertical(state);
    this.secondHandle.switchVertical(state);
    this.rangeLine.switchVertical(state);
    this.scaleValues.forEach((scaleValue: ScaleValueView) => {
      scaleValue.switchVertical(state);
    });
  }

  @autobind
  public updateValueLabelDisplayed(state: State) {
    this.firstHandle.switchLabel(state);
    this.secondHandle.switchLabel(state);
  }

  @autobind
  public updateScaleDisplayed(state: State) {
    this.scaleValues.forEach((scaleValue: ScaleValueView) => {
      scaleValue.switchLabel(state);
    });
  }

  @autobind
  public updateStep(state: State) {
    this.updateScale(state);
  }

  @autobind
  public updateMin(state: State) {
    this.updateScale(state);
  }

  @autobind
  public updateMax(state: State) {
    this.updateScale(state);
  }

  @autobind
  public updateFirstValue(state: State) {
    this.firstHandle.updateValue(state);
    this.secondHandle.updateValue(state);
    this.rangeLine.render(state);
  }

  @autobind
  public updateSecondValue(state: State) {
    this.firstHandle.updateValue(state);
    this.secondHandle.updateValue(state);
    this.rangeLine.render(state);
  }

  public subscribe(element: 'firstHandle' | 'secondHandle' | 'scale', subscriber: (position: number) => void): void {
    switch (element) {
      case 'firstHandle': this.firstHandle.subscribe(subscriber); break;
      case 'secondHandle': this.secondHandle.subscribe(subscriber); break;
      case 'scale': this.scaleSubscribers.add(subscriber); break;
      default: break;
    }
  }

  private static createRoot(container: HTMLElement): HTMLElement {
    const root = document.createElement('div');
    root.classList.add(classes.root);
    container.appendChild(root);
    return root;
  }

  private switchVertical(state: State) {
    const { isVertical } = state;

    if (isVertical) this.root.classList.add(classes.rootVertical);
    else this.root.classList.remove(classes.rootVertical);
  }

  private updateScale(state: State) {
    this.removeScaleValues();
    this.createScaleValues(View.calculatePointsNumber(state), state);
  }

  private createScaleValues(pointsNumber: number, state: State) {
    const { min, max, step } = state;
    const range = max - min;

    for (let i = 0; i < pointsNumber; i += 1) {
      this.scaleValues[i] = new ScaleValueView(this.root, state, i, pointsNumber);
      this.scaleValues[i].setClickSubscriber(this.scaleSubscribers.publish);
    }

    if ((range / step) % pointsNumber) {
      this.scaleValues.push(new ScaleValueView(this.root, state, pointsNumber + 1, pointsNumber));
      this.scaleValues[this.scaleValues.length - 1].setClickSubscriber(this.scaleSubscribers.publish);
    }
  }

  private removeScaleValues() {
    this.scaleValues.forEach((scaleValue: ScaleValueView) => scaleValue.remove());
    this.scaleValues.length = 0;
  }

  private static calculatePointsNumber(state: State) {
    const { min, max, step } = state;
    const range = max - min;
    const stepsNumber = Math.floor(range / step) + 1;

    let calcPointsNumber = stepsNumber;
    while (calcPointsNumber > POINTS_NUMBER_LIMIT) {
      calcPointsNumber = Math.floor(calcPointsNumber / 2);
    }

    return calcPointsNumber > 1 ? calcPointsNumber : 0;
  }

  private bindEventlisteners() {
    this.root.addEventListener('click', this.handleScaleClick);
  }

  @autobind
  private handleScaleClick(event: MouseEvent) {
    this.scaleSubscribers.publish(this.calculatePosition(event));
  }

  private calculatePosition(event: MouseEvent): number {
    let position = this.isVertical === true
      ? this.calculateVerticalPosition(event.clientY)
      : this.calculateHorizontalPosition(event.clientX);

    if (position > 1) position = 1;
    if (position < 0) position = 0;

    return position;
  }

  private calculateHorizontalPosition(x: number): number {
    const scaleBeginning = this.root.getBoundingClientRect().left;
    const length = this.root.offsetWidth;
    return (x - scaleBeginning) / length;
  }

  private calculateVerticalPosition(y: number): number {
    const length = this.root.offsetHeight;
    const scaleBeginning = this.root.getBoundingClientRect().top + length;
    return (scaleBeginning - y) / length;
  }
}

export { View };
