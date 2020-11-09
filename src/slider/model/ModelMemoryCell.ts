import { Observable } from '../observable/Observable';

interface CheckFunction<T> {
  (data: T): T
}

class ModelMemoryCell<T> {
  private value: T;

  private observer: Observable<T>;

  private checkFunction: CheckFunction<T>;

  constructor(value: T, checkFunction?: CheckFunction<T>) {
    this.value = value;
    this.observer = new Observable();
    this.checkFunction = checkFunction || ((givenValue: T) => givenValue);
  }

  public get() {
    return this.value;
  }

  public set(value: T) {
    this.value = this.checkFunction(value);
    this.observer.publish(this.value);
  }

  public addSubscriber(subscriber: Function) {
    this.observer.add(subscriber);
  }
}

export { ModelMemoryCell };
