import { SliderController } from "./sliderController"
import { SliderConfig } from "./sliderConfig/sliderConfig"

export default $.fn.slider = function (this: JQuery, options?: ImportedSliderConfig, slide?: SliderCallBackFunction) {
  
  let config = new SliderConfig(options)
  let slider = new SliderController(this[0], config, slide)

  this.config.isRange = function(value?: boolean): boolean {
    if (value !== undefined) config.isRange.set(value)
    return config.isRange.get() as boolean
  }

  this.config.hasDefaultValues = function(value?: boolean): boolean {
    if (value !== undefined) config.hasDefaultValues.set(value)
    return config.hasDefaultValues.get() as boolean
  }

  this.config.isVertical = function(value?: boolean): boolean {
    if (value !== undefined) config.isVertical.set(value)
    return config.isVertical.get() as boolean
  }

  this.config.valueLabelDisplayed = function(value?: boolean): boolean {
    if (value !== undefined) config.valueLabelDisplayed.set(value)
    return config.valueLabelDisplayed.get() as boolean
  }

  this.config.limitsDisplayed = function(value?: boolean): boolean {
    if (value !== undefined) config.limitsDisplayed.set(value)
    return config.limitsDisplayed.get() as boolean
  }

  this.config.minValue = function(value?: number): number {
    if (value !== undefined) config.minValue.set(value)
    return config.minValue.get() as number
  }

  this.config.maxValue = function(value?: number): number {
    if (value !== undefined) config.maxValue.set(value)
    return config.maxValue.get() as number
  }

  this.config.step = function(value?: number): number {
    if (value !== undefined) config.step.set(value)
    return config.step.get() as number
  }

  this.config.leftHandleValue = function(value?: number): number {
    if (value !== undefined) config.leftHandleValue.set(value)
    return config.leftHandleValue.get() as number
  }

  this.config.rightHandleValue = function(value?: number): number {
    if (value !== undefined) config.rightHandleValue.set(value)
    return config.rightHandleValue.get() as number
  }

  this.config.defaultValues = function(value?: number[] | string[]): number[] | string[] {
    if (value !== undefined) config.defaultValues.set(value)
    return config.defaultValues.get() as number[] | string[]
  }

  return this
}