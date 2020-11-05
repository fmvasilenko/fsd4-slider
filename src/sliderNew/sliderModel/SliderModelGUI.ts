import { SliderModel } from './SliderModel';

class SliderModelGUI {
  private model: SliderModel;

  private leftHandleExternalSubscriber: Function;

  private rightHandleExternalSubscriber: Function;

  constructor(model: SliderModel) {
    this.model = model;
    this.leftHandleExternalSubscriber = () => {};
    this.rightHandleExternalSubscriber = () => {};
  }

  public calculateLeftHandleValue(position: number) {
    this.model.leftHandleValue.set(this.calculateValue(position));
  }

  public calculateRightHandleValue(position: number) {
    this.model.rightHandleValue.set(this.calculateValue(position));
  }

  public setLeftHandleSubscriber(subscriber: Function) {
    this.leftHandleExternalSubscriber = subscriber;
  }

  public setRightHandleSubscriber(subscriber: Function) {
    this.rightHandleExternalSubscriber = subscriber;
  }

  private calculateValue(position: number): number {
    const range = this.model.maxValue.get() - this.model.minValue.get();
    return Math.floor(position * range);
  }

  private leftHandleSubscriber() {
    this.leftHandleExternalSubscriber(this.getCurrentState());
  }

  private rightHandleSubscriber() {
    this.rightHandleExternalSubscriber(this.getCurrentState());
  }

  private getCurrentState(): Config {
    return {
      isRange: this.model.isRange.get(),
      isVertical: this.model.isVertical.get(),
      valueLabelDisplayed: this.model.valueLabelDisplayed.get(),
      scaleDisplayed: this.model.scaleDisplayed.get(),
      minValue: this.model.minValue.get(),
      maxValue: this.model.maxValue.get(),
      step: this.model.step.get(),
      pointsNumber: this.model.pointsNumber.get(),
      leftHandleValue: this.model.leftHandleValue.get(),
      rightHandleValue: this.model.rightHandleValue.get(),
    };
  }
}

export { SliderModelGUI };
