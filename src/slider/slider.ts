///<reference path="./slider.d.ts" />

import { SliderView } from "./view/sliderView"
import { SliderModel } from "./sliderModel"

class Slider {
  ROOT: HTMLElement
  private MODEL: SliderModel
  private VIEW: SliderView
  private config: SliderConfig

  constructor(root: HTMLElement, config?: ImportedSliderConfig) {
    this.ROOT = root
    this.config = Object.assign(this.getDefaultConfig(), config)
    this.config = this.checkConfig()
    this.MODEL = new SliderModel(this)
    this.VIEW = new SliderView(this)
  }

  private getDefaultConfig(): SliderConfig {
    return {
      isRange: true,
      hasDefaultValues: false,
      minValue: 0,
      maxValue: 100,
      step: 1,
      leftHandleValue: 0,
      rightHandleValue: 100,
      defaultValues: ["first", "second", "third"]
    }
  }

  private checkConfig(): SliderConfig {
    let leftHandleValue = this.config.leftHandleValue
    let rightHandleValue = this.config.rightHandleValue
    let minValue = this.config.minValue
    let maxValue = this.config.maxValue

    if (maxValue < minValue) maxValue = minValue

    if (this.config.hasDefaultValues) {
      if (leftHandleValue < 0) leftHandleValue = 0
      if (leftHandleValue > this.config.defaultValues.length) leftHandleValue = this.config.defaultValues.length - 1
      if (rightHandleValue < leftHandleValue) rightHandleValue = leftHandleValue
      if (rightHandleValue > this.config.defaultValues.length) rightHandleValue = this.config.defaultValues.length - 1
      if (this.config.isRange == false) rightHandleValue = this.config.defaultValues.length - 1
    }
    else {
      if (leftHandleValue < minValue) leftHandleValue = minValue
      if (leftHandleValue > maxValue) leftHandleValue = maxValue
      if (rightHandleValue < leftHandleValue) rightHandleValue = leftHandleValue
      if (rightHandleValue > maxValue) rightHandleValue = maxValue
      if (this.config.isRange == false) rightHandleValue = maxValue
    }

    return {
      isRange: this.config.isRange,
      hasDefaultValues: this.config.hasDefaultValues,
      minValue: this.config.minValue,
      maxValue: maxValue,
      step: this.config.step,
      leftHandleValue: leftHandleValue,
      rightHandleValue: rightHandleValue,
      defaultValues: this.config.defaultValues
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