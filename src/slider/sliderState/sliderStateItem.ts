class SliderStateItem {
  private value: number
  private subscribers: Function[] = new Array()
  private checkValue: Function

  constructor(value: number, checkValue?: Function) {
    this.value = value
    this.checkValue = checkValue ? checkValue : (value: number) => {return value}
  }

  public set(value: number) {
    value = this.checkValue(value)
    this.value = value
    this.publish(this.value)
  }

  public get(): number {
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

  private publish(data: number) {
    this.subscribers.forEach((subscriber) => {
      subscriber(data)
    })
  }
}

export { SliderStateItem }