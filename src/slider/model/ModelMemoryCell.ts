import { Observable } from '../observable/Observable';

interface CheckFunction<T> {
  (data: T): T
}

class ModelMemoryCell<T> {
  private value: T;

  private observer: Observable<T>;

  private getState: () => State;

  private checkFunction: CheckFunction<T>;

  constructor(value: T, getState: () => State, checkFunction: CheckFunction<T> = (givenValue: T) => givenValue) {
    this.observer = new Observable();
    this.getState = getState;
    this.checkFunction = checkFunction;
    this.value = checkFunction(value);
  }

  public get() {
    return this.value;
  }

  public set(value: T) {
    this.value = this.checkFunction(value);
    this.observer.publish(this.getState());
  }

  public addSubscriber(subscriber: Function) {
    this.observer.add(subscriber);
  }

  public removeSubscriber(subscriber: Function) {
    this.observer.remove(subscriber);
  }

  public update() {
    this.set(this.value);
  }
}

export { ModelMemoryCell };
