class SliderDefaultValueLabel {
  private PARENT: SliderView
  ROOT: HTMLElement
  private LABEL: HTMLElement

  constructor(parent: SliderView, className: string) {
    this.PARENT = parent
    this.ROOT = this.createRootElement(className)
    this.LABEL = this.createLabel(className)
  }

  private createRootElement(className: string): HTMLElement {
    let root = document.createElement("div")
    root.classList.add(className)
    return root
  }

  private createLabel(className: string): HTMLElement {
    let label = document.createElement("div")
    label.classList.add(`${className}-label`)
    this.ROOT.appendChild(label)
    return label
  }

  public setShift(shift: number) {
    this.ROOT.style.left = `${shift}%`
  }

  public setValue(value: number | string) {
    this.LABEL.innerHTML = `${value}`
  }
}

export { SliderDefaultValueLabel }