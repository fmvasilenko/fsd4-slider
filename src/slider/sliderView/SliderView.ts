import { SliderHandleView } from './SliderHandleView';
import { SliderRangeLineView } from './SliderRangeLineView';
import { SliderScaleValueView } from './SliderScaleValueView';

enum HandleSide {Left, Right}

class SliderView {
  private classes: Classes;

  private root: HTMLElement;

  private leftHandle: SliderHandleView;

  private rightHandle: SliderHandleView;

  private rangeLine: SliderRangeLineView;

  private scaleValues: SliderScaleValueView[] = [];

  private leftHandleExternalSubscriber: Function = () => {};

  constructor(container: HTMLElement) {
    this.classes = require('../slider.classes.json');
    this.root = this.createRoot(container);
    this.leftHandle = new SliderHandleView(this.root, HandleSide.Left);
    this.rightHandle = new SliderHandleView(this.root, HandleSide.Right);
    this.rangeLine = new SliderRangeLineView(this.root);
  }

  public updateIsRange(state: State) {
    this.rightHandle.switch(state);
    this.rangeLine.render(state);
  }

  public updateIsVertical(state: State) {
    this.switchVertical(state);
    this.leftHandle.switchVertical(state);
    this.rightHandle.switchVertical(state);
    this.rangeLine.switchVertical(state);
    this.scaleValues.forEach((scaleValue: SliderScaleValueView) => {
      scaleValue.switchVertical(state);
    });
  }

  public updateValueLabelDisplayed(state: State) {
    this.leftHandle.switchLabel(state);
    this.rightHandle.switchLabel(state);
  }

  public updateScaleDisplayed(state: State) {
    this.scaleValues.forEach((scaleValue: SliderScaleValueView) => {
      scaleValue.switch(state);
    });
  }

  public updateStep(state: State) {
    this.updateScaleValues(state);
  }

  public updatePointsNumber(state: State) {
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
    this.leftHandleExternalSubscriber = subscriber;
  }

  public setRightHandlePositionSubscriber(subscriber: Function) {
    this.rightHandle.setPositionSubscriber(subscriber);
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
    this.scaleValues.forEach((value: SliderScaleValueView) => {
      value.remove();
    });
    this.scaleValues.length = 0;

    const {
      step, pointsNumber, minValue, maxValue,
    } = state;

    const range = maxValue - minValue;
    const stepsNumber = Math.floor(range / step);
    let calculatedPointsNumber = pointsNumber;

    if (pointsNumber > stepsNumber + 1) calculatedPointsNumber = stepsNumber + 1;

    for (let i = 0; i < calculatedPointsNumber; i += 1) {
      this.scaleValues[i] = new SliderScaleValueView(this.root, state, i, calculatedPointsNumber);
      this.scaleValues[i].setClickSubscriber(this.leftHandleExternalSubscriber);
    }
  }
}

export { SliderView };
