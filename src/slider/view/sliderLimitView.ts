import { toughCookie } from "jsdom"

enum Type{MinVal, MaxVal}

class SliderLimitView {
  private CLASSES: SliderClasses
  private TYPE: Type
  private config: SliderConfig
  public ROOT: HTMLElement
  private value: number

  constructor(config: SliderConfig, type: Type) {
    this.CLASSES = require("../sliderClasses.json")
    this.TYPE = type
    this.config = config
    this.ROOT = this.createRootElement()
    this.value = 0
    this.render()
  }

  private createRootElement() {
    let root = document.createElement("div")

    if (this.TYPE == Type.MinVal) {
      root.classList.add(this.CLASSES.MIN_VALUE)
      if (this.config.isVertical) root.classList.add(this.CLASSES.MIN_VALUE_VERTICAL)
    }
    else {
      root.classList.add(this.CLASSES.MAX_VALUE)
      if (this.config.isVertical) root.classList.add(this.CLASSES.MAX_VALUE_VERTICAL)
    }

    return root
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