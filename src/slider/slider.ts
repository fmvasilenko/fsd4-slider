import { SliderController } from "./sliderController"
import { SliderConfig } from "./sliderConfig/sliderConfig"

export default $.fn.slider = function (this: JQuery, options?: ImportedSliderConfig, slide?: SliderCallBackFunction) {
  
  let sliderConfig = new SliderConfig(options)
  let slider = new SliderController(this[0], sliderConfig, slide)

  this.config = {
    isRange: function(value?: boolean): boolean {
      if (value !== undefined) sliderConfig.isRange.set(value)
      return sliderConfig.isRange.get() as boolean
    },

    hasDefaultValues: function(value?: boolean): boolean {
      if (value !== undefined) sliderConfig.hasDefaultValues.set(value)
      return sliderConfig.hasDefaultValues.get() as boolean
    },

    isVertical: function(value?: boolean): boolean {
      if (value !== undefined) sliderConfig.isVertical.set(value)
      return sliderConfig.isVertical.get() as boolean
    },
    
    valueLabelDisplayed: function(value?: boolean): boolean {
      if (value !== undefined) sliderConfig.valueLabelDisplayed.set(value)
      return sliderConfig.valueLabelDisplayed.get() as boolean
    },

    limitsDisplayed: function(value?: boolean): boolean {
      if (value !== undefined) sliderConfig.limitsDisplayed.set(value)
      return sliderConfig.limitsDisplayed.get() as boolean
    },

    minValue: function(value?: number): number {
      if (value !== undefined) sliderConfig.minValue.set(value)
      return sliderConfig.minValue.get() as number
    },

    maxValue: function(value?: number): number {
      if (value !== undefined) sliderConfig.maxValue.set(value)
      return sliderConfig.maxValue.get() as number
    },

    step: function(value?: number): number {
      if (value !== undefined) sliderConfig.step.set(value)
      return sliderConfig.step.get() as number
    },

    leftHandleValue: function(value?: number): number {
      if (value !== undefined) sliderConfig.leftHandleValue.set(value)
      return sliderConfig.leftHandleValue.get() as number
    },

    rightHandleValue: function(value?: number): number {
      if (value !== undefined) sliderConfig.rightHandleValue.set(value)
      return sliderConfig.rightHandleValue.get() as number
    },

    defaultValues: function(value?: number[] | string[]): number[] | string[] {
      if (value !== undefined) sliderConfig.defaultValues.set(value)
      return sliderConfig.defaultValues.get() as number[] | string[]
    }
  }

  return this
}