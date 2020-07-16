interface ISliderConfigItem {
  set(value: number | string | boolean | number[] | string[]): void;
  get(): number | string | boolean | number[] | string[];
}

class SliderConfigItem implements ISliderConfigItem {
  private value: number | string | boolean | number[] | string[];

  private subscribers: Function[] = [];

  private checkValue: Function;

  constructor(
    value: number | string | boolean | number[] | string[],
    checkValue?: Function,
  ) {
    this.value = value;
    this.checkValue = checkValue
      || ((givenValue: number | string | boolean | number[] | string[]) => givenValue);
  }

  public set(value: number | string | boolean | number[] | string[]) {
    this.value = this.checkValue(value);
    this.publish(this.value);
  }

  public get(): number | string | boolean | number[] | string[] {
    return this.value;
  }

  public addSubscriber(subscriber: Function) {
    this.subscribers.push(subscriber);
  }

  public removeSubscriber(subscriber: Function) {
    this.subscribers = this.subscribers.filter((el) => el !== subscriber);
  }

  private publish(data: number | string | boolean | number[] | string[]) {
    this.subscribers.forEach((subscriber) => {
      subscriber(data);
    });
  }
}

export { SliderConfigItem };
