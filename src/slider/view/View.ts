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

  constructor(container: HTMLElement) {
    this.classes = require('../slider.classes.json');
    this.root = this.createRoot(container);
    this.leftHandle = new HandleView(this.root, HandleSide.Left);
    this.rightHandle = new HandleView(this.root, HandleSide.Right);
    this.rangeLine = new RangeLineView(this.root);
  }

  public updateIsRange(state: State) {
    this.rightHandle.switchHandle(state);
    this.rangeLine.render(state);
  }

  public updateIsVertical(state: State) {
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
    for (let i = 0; i < pointsNumber; i += 1) {
      this.scaleValues[i] = new ScaleValueView(this.root, state, i, pointsNumber);
      this.scaleValues[i].setClickSubscriber(this.scaleClickExternalSubscriber);
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

    return calcPointsNumber;
  }
}

export { View };
