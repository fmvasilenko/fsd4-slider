class Observable<T> {
  private subscribers: Function[];

  constructor() {
    this.subscribers = [];
  }

  public add(subscriber: Function) {
    this.subscribers.push(subscriber);
  }

  public remove(subscriber: Function) {
    this.subscribers = this.subscribers.filter((el) => el !== subscriber);
  }

  public publish(data: any) {
    this.subscribers.forEach((subscriber: Function) => {
      subscriber(data);
    });
  }
}

export { Observable };
