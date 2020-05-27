///<reference path="./slider.d.ts" />
import { SliderModel } from "./sliderModel"
import { SliderView } from "./sliderView"

class Slider {
  ROOT: HTMLElement
  MODEL: SliderModel
  VIEW: SliderView
  config: SliderConfig

  constructor(root: HTMLElement, config?: ImportedSliderConfig) {
    this.ROOT = root
    this.config = Object.assign(this.getDefaultConfig(), config)
    this.MODEL = new SliderModel(this, this.config)
    this.VIEW = new SliderView(this, this.ROOT, this.config)
  }

  private getDefaultConfig(): SliderConfig {
    return {
      isRange: false,
      minValue: 0,
      maxValue: 100,
      step: 1,
      value: 50,
      defaultValues: undefined
    }
  }

  public changeModel(parameters: ModelParameters) {
    this.MODEL.update(parameters)
  }

  public changeView(value: number) {
    this.VIEW.setState({value: value})
  }
}

export {Slider}