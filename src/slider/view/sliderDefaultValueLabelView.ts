class SliderDefaultValueLabel {
  private PARENT: SliderView
  private config: SliderConfig
  private CLASSES: SliderClasses
  ROOT: HTMLElement
  LABEL: HTMLElement

  constructor(parent: SliderView) {
    this.PARENT = parent
    this.config = this.PARENT.getConfig()
    this.CLASSES = this.PARENT.CLASSES
    this.ROOT = this.createRootElement()
    this.LABEL = this.createLabel()
  }

  private createRootElement(): HTMLElement {
    let root = document.createElement("div")
    root.classList.add(this.CLASSES.DEFAULT_VALUE)
    if (this.config.isVertical) root.classList.add(this.CLASSES.DEFAULT_VALUE_VERTICAL)
    return root
  }

  private createLabel(): HTMLElement {
    let label = document.createElement("div")
    label.classList.add(`${this.CLASSES.DEFAULT_VALUE_LABEL}`)
    if (this.config.isVertical) label.classList.add(`${this.CLASSES.DEFAULT_VALUE_LABEL_VERTICAL}`)
    this.ROOT.appendChild(label)
    return label
  }

  public setShift(shift: number) {
    if (this.config.isVertical)
      this.ROOT.style.top = `${shift}%`
    else
      this.ROOT.style.left = `${shift}%`
  }

  public setValue(value: number | string) {
    this.LABEL.innerHTML = `${value}`
  }
}

export { SliderDefaultValueLabel }