class SliderDefaultValueLabel {
  private config: SliderConfig
  private CLASSES: SliderClasses
  public ROOT: HTMLElement
  public LABEL: HTMLElement

  constructor(config: SliderConfig) {
    this.config = config
    this.CLASSES = require("../sliderClasses.json")
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
    if (shift < 0) shift = 0
    if (shift > 100) shift = 100

    if (this.config.isVertical) this.ROOT.style.top = `${shift}%`
    else this.ROOT.style.left = `${shift}%`
  }

  public setValue(value: number | string) {
    this.LABEL.innerHTML = `${value}`
  }
}

export { SliderDefaultValueLabel }