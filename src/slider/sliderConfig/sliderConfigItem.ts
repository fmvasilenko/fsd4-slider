interface ISliderConfigItem {
  set(value: number | string | boolean | number[] | string[]): void
  get(): number | string | boolean | number[] | string[]
}

class SliderConfigItem implements ISliderConfigItem {
  private value: number | string | boolean | number[] | string[]
  private subscribers: Function[] = new Array()
  private checkValue: Function

  constructor(value: number | string | boolean | number[] | string[], checkValue?: Function) {
    this.value = value
    this.checkValue = checkValue ? checkValue : (value: number | string | boolean | number[] | string[]) => {return value}
  }

  public set(value: number | string | boolean | number[] | string[]) {
    value = this.checkValue(value)
    this.value = value
    this.publish(this.value)
  }

  public get(): number | string | boolean | number[] | string[] {
    return this.value
  }

  public addSubscriber(subscriber: Function) {
    this.subscribers.push(subscriber)
  }

  public removeSubscriber(subscriber: Function) {
    this.subscribers = this.subscribers.filter((el) => {
      return el !== subscriber
    })
  }

  private publish(data: number | string | boolean | number[] | string[]) {
    this.subscribers.forEach((subscriber) => {
      subscriber(data)
    })
  }
}

export { SliderConfigItem }