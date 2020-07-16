class SliderStateItem {
  private value: number;

  private subscribers: Function[] = [];

  private checkValue: Function;

  constructor(value: number, checkValue?: Function) {
    this.value = value;
    this.checkValue = checkValue || ((givenValue: number) => givenValue);
  }

  public set(value: number) {
    this.value = this.checkValue(value);
    this.publish(this.value);
  }

  public get(): number {
    return this.value;
  }

  public addSubscriber(subscriber: Function) {
    this.subscribers.push(subscriber);
  }

  public removeSubscriber(subscriber: Function) {
    this.subscribers = this.subscribers.filter((el) => el !== subscriber);
  }

  private publish(data: number) {
    this.subscribers.forEach((subscriber) => {
      subscriber(data);
    });
  }
}

export { SliderStateItem };
