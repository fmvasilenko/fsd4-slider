interface IObservable {
  addSubscriber: Function
  removeSubscriber: Function
  publish: Function
}

class Observable implements IObservable {
  private subscribers: Function[] = new Array()

  public addSubscriber(subscriber: Function) {
    this.subscribers.push(subscriber)
  }

  public removeSubscriber(subscriber: Function) {
    this.subscribers = this.subscribers.filter((el) => {
      return el !== subscriber;
    })
  }

  public publish(data: number | string) {
    this.subscribers.forEach((subscriber) => {
      subscriber(data);
    })
  }
}

export { Observable }