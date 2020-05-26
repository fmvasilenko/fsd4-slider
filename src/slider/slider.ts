///<reference path="./slider.d.ts" />
import { SliderModel } from "./sliderModel"
import { SliderView } from "./sliderView"

class Slider {
  ROOT: HTMLElement
  MODEL: SliderModel
  VIEW: SliderView
  config: SliderConfig

  constructor(root: HTMLElement, config?: SliderConfig) {
    this.ROOT = root
    this.config = Object.assign(this.getDefaultConfig(), config)
    this.MODEL = new SliderModel(this.config)
    this.VIEW = new SliderView(this.ROOT)
  }

  getDefaultConfig(): SliderConfig {
    return {
      isRange: false,
      minValue: 0,
      maxValue: 100
    }
  }

  changeModel(parameters: ModelParameters) {
    console.log("changing model")
  }
}

export {Slider}