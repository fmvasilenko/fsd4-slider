class SliderLimitsView {
  public ROOT: HTMLElement
  private value: number

  constructor(rootClass: string) {
    this.ROOT = this.createRootElement(rootClass)
    this.value = 0
  }

  private createRootElement(className: string): HTMLElement {
    let root = document.createElement("div")
    root.classList.add(className)
    return root
  }

  public updateValue(value: number) {
    this.value = value
    this.render(this.value)
  }

  private render(value: number) {
    this.ROOT.innerHTML = `${value}`
  }
}

export { SliderLimitsView }