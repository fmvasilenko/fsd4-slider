/* eslint-disable object-curly-newline */
/* eslint-disable class-methods-use-this */
import { HandleView } from './HandleView';
import { RangeLineView } from './RangeLineView';
import { ScaleValueView } from './ScaleValueView';

enum HandleSide {Left, Right}

const POINTS_NUMBER_LIMIT = 10;

class View {
  private classes: Classes;

  private root: HTMLElement;

  private leftHandle: HandleView;

  private rightHandle: HandleView;

  private rangeLine: RangeLineView;

  private scaleValues: ScaleValueView[] = [];

  private scaleClickExternalSubscriber: Function = () => {};

  private isVertical = false;

  constructor(container: HTMLElement) {
    this.classes = require('../slider.classes.json');
    this.root = this.createRoot(container);
    this.leftHandle = new HandleView(this.root, HandleSide.Left);
    this.rightHandle = new HandleView(this.root, HandleSide.Right);
    this.rangeLine = new RangeLineView(this.root);
    this.bindEventlisteners();
  }

  public updateIsRange(state: State) {
    this.rightHandle.switchHandle(state);
    this.rangeLine.render(state);
  }

  public updateIsVertical(state: State) {
    this.isVertical = state.isVertical;
    this.switchVertical(state);
    this.leftHandle.switchVertical(state);
    this.rightHandle.switchVertical(state);
    this.rangeLine.switchVertical(state);
    this.scaleValues.forEach((scaleValue: ScaleValueView) => {
      scaleValue.switchVertical(state);
    });
  }

  public updateValueLabelDisplayed(state: State) {
    this.leftHandle.switchLabel(state);
    this.rightHandle.switchLabel(state);
  }

  public updateScaleDisplayed(state: State) {
    this.scaleValues.forEach((scaleValue: ScaleValueView) => {
      scaleValue.switchLabel(state);
    });
  }

  public updateStep(state: State) {
    this.updateScaleValues(state);
  }

  public updateMinValue(state: State) {
    this.updateScaleValues(state);
  }

  public updateMaxValue(state: State) {
    this.updateScaleValues(state);
  }

  public updateLeftHandleValue(state: State) {
    this.leftHandle.updateValue(state);
    this.rightHandle.updateValue(state);
    this.rangeLine.render(state);
  }

  public updateRightHandleValue(state: State) {
    this.leftHandle.updateValue(state);
    this.rightHandle.updateValue(state);
    this.rangeLine.render(state);
  }

  public setLeftHandlePositionSubscriber(subscriber: Function) {
    this.leftHandle.setPositionSubscriber(subscriber);
  }

  public setRightHandlePositionSubscriber(subscriber: Function) {
    this.rightHandle.setPositionSubscriber(subscriber);
  }

  public setScaleClickSubscriber(subscriber: Function) {
    this.scaleClickExternalSubscriber = subscriber;
  }

  private createRoot(container: HTMLElement): HTMLElement {
    const root = document.createElement('div');
    root.classList.add(this.classes.root);
    container.appendChild(root);
    return root;
  }

  private switchVertical(state: State) {
    const { isVertical } = state;

    if (isVertical) this.root.classList.add(this.classes.rootVertical);
    else this.root.classList.remove(this.classes.rootVertical);
  }

  private updateScaleValues(state: State) {
    this.removeScaleValues();
    this.createScaleValues(this.calculatePointsNumber(state), state);
  }

  private createScaleValues(pointsNumber: number, state: State) {
    const { minValue, maxValue, step } = state;
    const range = maxValue - minValue;

    for (let i = 0; i < pointsNumber; i += 1) {
      this.scaleValues[i] = new ScaleValueView(this.root, state, i, pointsNumber);
      this.scaleValues[i].setClickSubscriber(this.scaleClickExternalSubscriber);
    }

    if ((range / step) % pointsNumber) {
      this.scaleValues.push(new ScaleValueView(this.root, state, pointsNumber + 1, pointsNumber));
      this.scaleValues[this.scaleValues.length - 1].setClickSubscriber(this.scaleClickExternalSubscriber);
    }
  }

  private removeScaleValues() {
    this.scaleValues.forEach((scaleValue: ScaleValueView) => scaleValue.remove());
    this.scaleValues.length = 0;
  }

  private calculatePointsNumber(state: State) {
    const { minValue, maxValue, step } = state;
    const range = maxValue - minValue;
    const stepsNumber = Math.floor(range / step) + 1;

    let calcPointsNumber = stepsNumber;
    while (calcPointsNumber > POINTS_NUMBER_LIMIT) {
      calcPointsNumber = Math.floor(calcPointsNumber / 2);
    }

    return calcPointsNumber > 1 ? calcPointsNumber : 0;
  }

  private bindEventlisteners() {
    this.root.addEventListener('click', this.clickHandler.bind(this));
  }

  private clickHandler(event: MouseEvent) {
    this.scaleClickExternalSubscriber(this.calculatePosition(event));
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
