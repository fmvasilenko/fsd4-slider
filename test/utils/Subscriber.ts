class Subscriber<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  public set = (value: T) => {
    this.value = value;
  };

  public get(): T {
    return this.value;
  }
}

export { Subscriber };
