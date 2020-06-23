import { SliderConfig } from "../sliderConfig/sliderConfig"
import { SliderState } from "../sliderState/sliderState"

enum Type{MinVal, MaxVal}

class SliderLimitView {
  private CONTAINER: HTMLElement
  private ROOT: HTMLElement
  private CLASSES: SliderClasses
  private TYPE: Type
  private config: SliderConfig
  private state: SliderState

  constructor(container: HTMLElement, config: SliderConfig, state: SliderState, type: Type) {
    this.CONTAINER = container
    this.CLASSES = require("../sliderClasses.json")
    this.TYPE = type
    this.config = config
    this.state = state
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

    this.config.isVertical.addSubscriber(this.switchVertical.bind(this))

    this.bindEventListeners()
  }

  private createRootElement() {
    let root = document.createElement("div")

    if (this.TYPE == Type.MinVal) {
      root.classList.add(this.CLASSES.MIN_VALUE)
      if (this.config.isVertical.get() === true) root.classList.add(this.CLASSES.MIN_VALUE_VERTICAL)
    }
    else {
      root.classList.add(this.CLASSES.MAX_VALUE)
      if (this.config.isVertical.get() === true) root.classList.add(this.CLASSES.MAX_VALUE_VERTICAL)
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

  private switchVertical(value: boolean) {
    if (value === true) {
      if (this.TYPE === Type.MinVal) this.ROOT.classList.add(this.CLASSES.MIN_VALUE_VERTICAL)
      else this.ROOT.classList.add(this.CLASSES.MAX_VALUE_VERTICAL)
    }
    else {
      if (this.TYPE === Type.MinVal) this.ROOT.classList.remove(this.CLASSES.MIN_VALUE_VERTICAL)
      else this.ROOT.classList.remove(this.CLASSES.MAX_VALUE_VERTICAL)
    }
  }

  private setValue(value: number) {
    this.ROOT.innerHTML = `${value}`
  }

  private bindEventListeners() {
    this.ROOT.addEventListener("click", this.clickHandler.bind(this))
  }

  private clickHandler() {
    if (this.config.isRange.get() === false) {
      if (this.TYPE === Type.MinVal) this.state.leftHandlePosition.set(0)
      else this.state.leftHandlePosition.set(1)
    }
  }
}

export { SliderLimitView }