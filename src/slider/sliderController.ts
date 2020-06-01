///<reference path="./slider.d.ts" />

import { SliderView } from "./view/sliderView"
import { SliderModel } from "./sliderModel"

class SliderController {
  ROOT: HTMLElement
  private MODEL: SliderModel
  private VIEW: SliderView
  private config: SliderConfig
  private slideFunction: SliderCallBackFunction | undefined

  constructor(root: HTMLElement, config?: ImportedSliderConfig, slide?: SliderCallBackFunction) {
    this.ROOT = root
    this.config = Object.assign(this.getDefaultConfig(), config)
    this.config = this.checkConfig()
    this.slideFunction = slide
    this.MODEL = new SliderModel(this)
    this.VIEW = new SliderView(this)
  }

  private getDefaultConfig(): SliderConfig {
    return {
      isRange: true,
      hasDefaultValues: false,
      isVertical: false,
      valueLabelDisplayed: true,
      limitsDisplayed: true,
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
    let step = this.config.step

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
      if (step < 1) step = 1;
    }

    return {
      isRange: this.config.isRange,
      hasDefaultValues: this.config.hasDefaultValues,
      isVertical: this.config.isVertical,
      valueLabelDisplayed: this.config.valueLabelDisplayed,
      limitsDisplayed: this.config.limitsDisplayed,
      minValue: this.config.minValue,
      maxValue: maxValue,
      step: step,
      leftHandleValue: leftHandleValue,
      rightHandleValue: rightHandleValue,
      defaultValues: this.config.defaultValues
    }
  }

  public getConfig(): SliderConfig {
    return this.config
  }

  public calculateLeftHandleValue(position: number) {
    let value = this.MODEL.calculateLeftHandleValue(position)
    this.VIEW.changeLeftHandleValue(value)
    if (this.slideFunction !== undefined) 
      this.slideFunction(this.MODEL.getLeftHandleValue(), this.MODEL.getRightHandleValue())
  }

  public calculateRightHandleValue(position: number) {
    let value = this.MODEL.calculateRightHandleValue(position)
    this.VIEW.changeRightHandleValue(value)
  }

  public setLeftHandleValue(value: number) {
    if (value > this.config.maxValue) value = this.config.maxValue
    if (value < this.config.minValue) value = this.config.minValue
    this.MODEL.setLeftHandleValue(value)
    this.VIEW.changeLeftHandleValue(value)
  }

  public setRightHandleValue(value: number) {
    if (value > this.config.maxValue) value = this.config.maxValue
    if (value < this.config.minValue) value = this.config.minValue
    this.MODEL.setRightHandleValue(value)
    this.VIEW.changeRightHandleValue(value)
  }

  public getLeftHandleValue(): number {
    return this.MODEL.getLeftHandleValue()
  }

  public getRightHandleValue(): number {
    return this.MODEL.getRightHandleValue()
  }
}

export { SliderController }