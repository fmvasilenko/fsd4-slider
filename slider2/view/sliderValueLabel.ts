class SliderValueLabel {
  ROOT: HTMLElement
  private config: SliderConfig
  private value: number

  constructor(className: string, config: SliderConfig) {
    this.ROOT = this.createRootElement(className)
    this.config = config
    this.value = this.config.defaultValues ? 0 : this.config.value
    this.render()
  }

  getValue(): number {
    return this.value
  }

  setValue(value: number) {
    this.value = value
    this.render()
  }

  private createRootElement(className: string): HTMLElement {
    let root = document.createElement("div")
    root.classList.add(className)
    return root
  }

  public updateValue(value: number) {
    this.setValue(value)
  }

  private render() {
    if (this.config.defaultValues === undefined)
      this.ROOT.innerHTML = `${this.value}`
    else 
      this.ROOT.innerHTML = `${this.config.defaultValues[this.value]}`
  }
}

export { SliderValueLabel }