import { Observable } from '../observable/Observable';

interface CheckFunction<T> {
  (data: T): T
}

class ModelMemoryCell<T> {
  private value: T;

  private subscribers: Observable;

  private getState: () => State;

  private checkFunction: CheckFunction<T>;

  constructor(value: T, getState: () => State, checkFunction: CheckFunction<T> = (givenValue: T) => givenValue) {
    this.subscribers = new Observable();
    this.getState = getState;
    this.checkFunction = checkFunction;
    this.value = checkFunction(value);
  }

  public get() {
    return this.value;
  }

  public set(value: T) {
    this.value = this.checkFunction(value);
    this.subscribers.publish(this.getState());
  }

  public addSubscriber(subscriber: (state: State) => void) {
    this.subscribers.add(subscriber);
  }

  public removeSubscriber(subscriber: (state: State) => void) {
    this.subscribers.remove(subscriber);
  }

  public update() {
    this.set(this.value);
  }
}

export { ModelMemoryCell };
