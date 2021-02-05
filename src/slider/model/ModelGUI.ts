/* eslint-disable object-curly-newline */
import { Model } from './Model';

class ModelGUI {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  public calculateFirstValue(position: number) {
    this.model.firstValue.set(this.calculateValue(position));
  }

  public calculateSecondValue(position: number) {
    this.model.secondValue.set(this.calculateValue(position));
  }

  public calculateAndChooseHandle(position: number) {
    const { isRange, min, firstValue, secondValue } = this.model;
    const value = this.calculateValue(position);
    const normValue = value - min.get();
    const middelValue = (secondValue.get() - firstValue.get()) / 2 + firstValue.get();
    const normMiddelValue = middelValue - min.get();

    if (isRange.get() && normValue > normMiddelValue) secondValue.set(value);
    else firstValue.set(value);
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
    const { min, max } = this.model;
    const range = max.get() - min.get();
    return position * range + min.get();
  }
}

export { ModelGUI };
