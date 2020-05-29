///<reference path="./slider.d.ts" />

import { SliderView } from "./view/sliderView"
import { SliderModel } from "./sliderModel"

class Slider {
  ROOT: HTMLElement
  private MODEL: SliderModel
  private VIEW: SliderView
  private config: SliderConfig

  constructor(root: HTMLElement, config?: number) {
    this.ROOT = root
    this.config = this.getDefaultConfig()
    this.MODEL = new SliderModel(this)
    this.VIEW = new SliderView(this)
  }

  private getDefaultConfig(): SliderConfig {
    return {
      type: "defaultValues",
      minValue: 0,
      maxValue: 100,
      step: 1,
      leftHandleValue: 0,
      rightHandleValue: 100,
      defaultValues: ["first", "second", "third"]
    }
  }

  public getConfig(): SliderConfig {
    return this.config
  }

  public calculateLeftHandleValue(position: number): number {
    return this.MODEL.calculateLeftHandleValue(position)
  }

  public calculateRightHandleValue(position: number): number {
    return this.MODEL.calculateRightHandleValue(position)
  }
}

export { Slider }