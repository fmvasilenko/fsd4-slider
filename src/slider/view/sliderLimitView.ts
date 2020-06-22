import { SliderConfig } from "../sliderConfig/sliderConfig"

enum Type{MinVal, MaxVal}

class SliderLimitView {
  private CONTAINER: HTMLElement
  private ROOT: HTMLElement
  private CLASSES: SliderClasses
  private TYPE: Type
  private config: SliderConfig

  constructor(container: HTMLElement, config: SliderConfig, type: Type) {
    this.CONTAINER = container
    this.CLASSES = require("../sliderClasses.json")
    this.TYPE = type
    this.config = config
    this.ROOT = this.createRootElement()

    this.config.limitsDisplayed.addSubscriber(this.switch.bind(this))

    this.switch(this.config.limitsDisplayed.get() as boolean)

    if (this.TYPE == Type.MinVal) {
      this.setValue(this.config.minValue.get() as number)
      this.config.minValue.addSubscriber(this.setValue.bind(this))
    }
    else {
      this.setValue(this.config.maxValue.get() as number)
      this.config.maxValue.addSubscriber(this.setValue.bind(this))
    }
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

  private switch(value: boolean) {
    if (value === true && this.config.hasDefaultValues.get() === false) {
      this.CONTAINER.appendChild(this.ROOT)
    }
    else {
      this.ROOT.remove()
    }
  }

  private setValue(value: number) {
    this.ROOT.innerHTML = `${value}`
  }
}

export { SliderLimitView }