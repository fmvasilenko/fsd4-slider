class SliderLimitView {
  ROOT: HTMLElement
  private value: number

  constructor(parent: SliderView, className: string) {
    this.ROOT = this.createRootElement(className)
    this.value = 0
    this.render()
  }

  private createRootElement(className: string) {
    let label = document.createElement("div")
    label.classList.add(className)
    return label
  }

  public setValue(value: number) {
    this.value = value
    this.render()
  }

  private render() {
    this.ROOT.innerHTML = `${this.value}`
  }
}

export { SliderLimitView }