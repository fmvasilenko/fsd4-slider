import { toughCookie } from "jsdom"

enum Type{MinVal, MaxVal}

class SliderLimitView {
  private PARENT: SliderView
  private CLASSES: SliderClasses
  private TYPE: Type
  private config: SliderConfig
  ROOT: HTMLElement
  private value: number

  constructor(parent: SliderView, type: Type) {
    this.PARENT = parent
    this.CLASSES = this.PARENT.CLASSES
    this.TYPE = type
    this.config = this.PARENT.getConfig()
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