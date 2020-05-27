class SliderValueLabel {
  ROOT: HTMLElement
  private _value: number

  constructor(className: string) {
    this.ROOT = this.createRootElement(className)
    this._value = 0
  }

  get value(): number {
    return this._value
  }

  set value(value: number) {
    this._value = value
    this.render()
  }

  private createRootElement(className: string): HTMLElement {
    let root = document.createElement("div")
    root.classList.add(className)
    return root
  }

  public updateValue(value: number) {
    this.value = value
  }

  private render() {
    this.ROOT.innerHTML = `${this.value}`
  }
}

export { SliderValueLabel }