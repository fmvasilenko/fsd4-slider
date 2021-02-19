import autobind from 'autobind-decorator';

class Observable<T> {
  private subscribers: ((value: T) => void)[];

  constructor() {
    this.subscribers = [];
  }

  public add(subscriber: (value: T) => void) {
    this.subscribers.push(subscriber);
  }

  public remove(subscriber: (value: T) => void) {
    this.subscribers = this.subscribers.filter((el) => el !== subscriber);
  }

  @autobind
  public publish(data: T) {
    this.subscribers.forEach((subscriber: (value: T) => void) => {
      subscriber(data);
    });
  }
}

export { Observable };
