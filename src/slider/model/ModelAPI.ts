/* eslint-disable object-curly-newline */
import autobind from 'autobind-decorator';
import { Model } from './Model';

class ModelAPI {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  @autobind
  public calculateFirstValue(position: number) {
    this.model.firstValue.set(this.calculateValue(position));
  }

  @autobind
  public calculateSecondValue(position: number) {
    this.model.secondValue.set(this.calculateValue(position));
  }

  @autobind
  public calculateAndChooseHandle(position: number) {
    const { isRange, min, firstValue, secondValue } = this.model;
    const value = this.calculateValue(position);
    const normValue = value - min.get();
    const middelValue = (secondValue.get() - firstValue.get()) / 2 + firstValue.get();
    const normMiddelValue = middelValue - min.get();

    if (isRange.get() && normValue > normMiddelValue) secondValue.set(value);
    else firstValue.set(value);
  }

  public subscribe(option: ModelOption, subscriber: (value: number | boolean) => void): void {
    this.model[option].addSubscriber(subscriber);
  }

  public unsubscribe(option: ModelOption, subscriber: (value: number | boolean) => void): void {
    this.model[option].removeSubscriber(subscriber);
  }

  @autobind
  public getCurrentState(): State {
    return this.model.getCurrentState();
  }

  private calculateValue(position: number): number {
    const { min, max } = this.model;
    const range = max.get() - min.get();
    return position * range + min.get();
  }
}

export { ModelAPI };
