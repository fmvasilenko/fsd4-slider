import { SliderConfig } from "../sliderConfig/sliderConfig"

class SliderDefaultValueLabel {
  private CONTAINER: HTMLElement
  private config: SliderConfig
  private CLASSES: SliderClasses
  private ROOT: HTMLElement
  private LABEL: HTMLElement
  private index: number

  constructor(container: HTMLElement, config: SliderConfig, index: number) {
    this.CONTAINER = container
    this.config = config
    this.index = index
    this.CLASSES = require("../sliderClasses.json")
    this.ROOT = this.createRootElement()
    this.LABEL = this.createLabel()

    this.updateValue()
    this.updateShift()
    this.switch()

    this.config.defaultValues.addSubscriber(this.updateValue.bind(this))
    this.config.defaultValues.addSubscriber(this.updateShift.bind(this))
    this.config.hasDefaultValues.addSubscriber(this.switch.bind(this))
    this.config.isVertical.addSubscriber(this.switchVertical.bind(this))
    this.config.isVertical.addSubscriber(this.updateShift.bind(this))
  }

  private createRootElement(): HTMLElement {
    let root = document.createElement("div")

    root.classList.add(this.CLASSES.DEFAULT_VALUE)
    if (this.config.isVertical.get() === true) root.classList.add(this.CLASSES.DEFAULT_VALUE_VERTICAL)

    return root
  }

  private createLabel(): HTMLElement {
    let label = document.createElement("div")

    label.classList.add(`${this.CLASSES.DEFAULT_VALUE_LABEL}`)
    if (this.config.isVertical.get() === true) label.classList.add(`${this.CLASSES.DEFAULT_VALUE_LABEL_VERTICAL}`)
    
    this.ROOT.appendChild(label)
    return label
  }

  private updateShift() {
    let shift = 100 * this.index / ((this.config.defaultValues.get() as number[] | string[]).length - 1)

    if (this.config.isVertical.get() === true) this.ROOT.style.bottom = `${shift}%`
    else this.ROOT.style.left = `${shift}%`
  }

  private updateValue() {
    this.LABEL.innerHTML = `${(this.config.defaultValues.get() as number[] | string[])[this.index]}`
  }

  private switch() {
    if (this.config.hasDefaultValues.get() === true) this.CONTAINER.appendChild(this.ROOT)
    else this.ROOT.remove()
  }

  private switchVertical(value: boolean) {
    if (value === true) {
      this.ROOT.style.left = ""
      this.ROOT.classList.add(this.CLASSES.DEFAULT_VALUE_VERTICAL)
      this.LABEL.classList.add(this.CLASSES.DEFAULT_VALUE_LABEL_VERTICAL)
    }
    else {
      this.ROOT.style.top = ""
      this.ROOT.classList.remove(this.CLASSES.DEFAULT_VALUE_VERTICAL)
      this.LABEL.classList.remove(this.CLASSES.DEFAULT_VALUE_LABEL_VERTICAL)
    }
  }

  public remove() {
    this.ROOT.remove()
  }
}

export { SliderDefaultValueLabel }