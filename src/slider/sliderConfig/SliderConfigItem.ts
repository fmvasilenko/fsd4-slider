interface ISliderConfigItem<T> {
  set(value: T): void;
  get(): T;
}

class SliderConfigItem<T> implements ISliderConfigItem<T> {
  private value: T;

  private subscribers: Function[] = [];

  private checkValue: Function;

  constructor(
    value: T,
    checkValue?: Function,
  ) {
    this.value = value;
    this.checkValue = checkValue
      || ((givenValue: T) => givenValue);
  }

  public set(value: T) {
    this.value = this.checkValue(value);
    this.publish(this.value);
  }

  public get(): T {
    return this.value;
  }

  public addSubscriber(subscriber: Function) {
    this.subscribers.push(subscriber);
  }

  public removeSubscriber(subscriber: Function) {
    this.subscribers = this.subscribers.filter((el) => el !== subscriber);
  }

  private publish(data: T) {
    this.subscribers.forEach((subscriber) => {
      subscriber(data);
    });
  }
}

export { SliderConfigItem };
