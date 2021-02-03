/* eslint-disable object-curly-newline */
import { Model } from './Model';

class ModelGUI {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  public calculateLeftHandleValue(position: number) {
    this.model.leftHandleValue.set(this.calculateValue(position));
  }

  public calculateRightHandleValue(position: number) {
    this.model.rightHandleValue.set(this.calculateValue(position));
  }

  public calculateAndChooseHandle(position: number) {
    const { isRange, minValue, leftHandleValue, rightHandleValue } = this.model;
    const value = this.calculateValue(position);
    const normValue = value - minValue.get();
    const middelValue = (rightHandleValue.get() - leftHandleValue.get()) / 2 + leftHandleValue.get();
    const normMiddelValue = middelValue - minValue.get();

    if (isRange.get() && normValue > normMiddelValue) rightHandleValue.set(value);
    else leftHandleValue.set(value);
  }

  public subscribe<T>(option: ModelOption, subscriber: (value: T) => void): void {
    this.model[option].addSubscriber(subscriber);
  }

  public unsubscribe<T>(option: ModelOption, subscriber: (value: T) => void): void {
    this.model[option].removeSubscriber(subscriber);
  }

  public getCurrentState(): State {
    return this.model.getCurrentState();
  }

  private calculateValue(position: number): number {
    const { minValue, maxValue } = this.model;
    const range = maxValue.get() - minValue.get();
    return position * range + minValue.get();
  }
}

export { ModelGUI };
