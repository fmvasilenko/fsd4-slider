import { SliderConfigItem } from "./sliderConfigItem"

interface ImportedSliderConfig {
  isRange?: boolean
  hasDefaultValues?: boolean
  isVertical?: boolean
  valueLabelDisplayed?: boolean
  limitsDisplayed?: boolean
  minValue?: number
  maxValue?: number
  step?: number
  leftHandleValue?: number
  rightHandleValue?: number
  defaultValues?: number[] | string[]
}

class SliderConfig {
  public isRange: SliderConfigItem
  public hasDefaultValues: SliderConfigItem
  public isVertical: SliderConfigItem
  public valueLabelDisplayed: SliderConfigItem
  public limitsDisplayed: SliderConfigItem
  public minValue: SliderConfigItem
  public maxValue: SliderConfigItem
  public step: SliderConfigItem
  public leftHandleValue: SliderConfigItem
  public rightHandleValue: SliderConfigItem
  public defaultValues: SliderConfigItem

  constructor(importedConfig?: ImportedSliderConfig) {
    let config = Object.assign(this.getDefaultConfig(), importedConfig)
    this.isRange = this.setIsRange(config.isRange)
    this.hasDefaultValues = this.setHasDefaultValues(config.hasDefaultValues)
    this.isVertical = this.boolean(config.isVertical)
    this.valueLabelDisplayed = this.boolean(config.valueLabelDisplayed)
    this.limitsDisplayed = this.boolean(config.limitsDisplayed)
    this.minValue = this.setMinValue(config.minValue)
    this.maxValue = this.setMaxValue(config.maxValue)
    this.step = this.setStep(config.step)
    this.defaultValues = this.setDefaultValues(config.defaultValues)
    this.leftHandleValue = this.setLeftHandleValue(config.leftHandleValue)
    this.rightHandleValue = this.setRightHandleValue(config.rightHandleValue)
  }

  private getDefaultConfig() {
    return {
      isRange: false,
      hasDefaultValues: false,
      isVertical: false,
      valueLabelDisplayed: true,
      limitsDisplayed: true,
      minValue: 0,
      maxValue: 0,
      step: 1,
      defaultValues: ["first", "second", "third"],
      leftHandleValue: 20,
      rightHandleValue: 80
    }
  }

  private boolean(value: boolean): SliderConfigItem {
    return new SliderConfigItem(value)
  }

  private setIsRange(value: boolean): SliderConfigItem {
    let isRange = new SliderConfigItem(value)
    isRange.addSubscriber(this.updateHandlesValues.bind(this))
    return isRange
  }

  private setHasDefaultValues(value: boolean): SliderConfigItem {
    let hasDefaultValues = new SliderConfigItem(value)
    hasDefaultValues.addSubscriber(this.updateHandlesValues.bind(this))
    return hasDefaultValues
  }

  private setMinValue(value: number): SliderConfigItem {
    let minValue = new SliderConfigItem(value, this.checkMinValue.bind(this))
    minValue.addSubscriber(this.updateHandlesValues.bind(this))
    return minValue
  }

  private setMaxValue(value: number): SliderConfigItem {
    if (value < this.minValue.get()) value = this.minValue.get() as number
    let maxValue = new SliderConfigItem(value, this.checkMaxValue.bind(this))
    maxValue.addSubscriber(this.updateHandlesValues.bind(this))
    return maxValue
  }

  private setStep(step: number): SliderConfigItem {
    if (step < 1) step = 1
    return new SliderConfigItem(step, this.checkStep.bind(this))
  }

  private setDefaultValues(values: number[] | string[]): SliderConfigItem {
    let defaultValues =  new SliderConfigItem(values)
    defaultValues.addSubscriber(this.updateHandlesValues.bind(this))
    return defaultValues
  }

  private setLeftHandleValue(value: number): SliderConfigItem {
    value = this.checkHandleValue(value)
    return new SliderConfigItem(value, this.checkLeftHandleValue.bind(this))
  }

  private setRightHandleValue(value: number): SliderConfigItem {
    value = this.checkRightHandleValue(value)
    return new SliderConfigItem(value, this.checkRightHandleValue.bind(this))
  }

  private updateHandlesValues() {
    this.leftHandleValue.set(this.leftHandleValue.get())
    this.rightHandleValue.set(this.rightHandleValue.get())
  }

  private checkMinValue(value: number): number {
    if (value > this.maxValue.get()) value = this.maxValue.get() as number
    return value
  }

  private checkMaxValue(value: number): number {
    if (value < this.minValue.get()) value = this.minValue.get() as number
    return value
  }

  private checkStep(step: number): number {
    if (step < 1) step = 1
    return step
  }

  private checkLeftHandleValue(value: number): number {
    value = this.checkHandleValue(value)

    if (this.isRange.get()) {
      if (value > this.rightHandleValue.get()) value = this.rightHandleValue.get() as number
    }

    return value
  }

  private checkRightHandleValue(value: number): number {
    if (this.isRange.get()) {
      value = this.checkHandleValue(value)
      if (value < this.leftHandleValue.get()) value = this.leftHandleValue.get() as number
    }
    else {
      let defaultValuesSize = (this.defaultValues.get() as number[] | string[]).length
      if (this.hasDefaultValues.get()) value = defaultValuesSize - 1
      else value = this.maxValue.get() as number
    }
    return value
  }

  private checkHandleValue(value: number): number {
    if (this.hasDefaultValues.get()) {
      let defaultValuesSize = (this.defaultValues.get() as number[] | string[]).length
      if (value < 0) value = 0
      if (value > defaultValuesSize - 1) value = defaultValuesSize - 1
    }
    else {
      if (value < this.minValue.get()) value = this.minValue.get() as number
      if (value > this.maxValue.get()) value = this.maxValue.get() as number
    }
    return value
  }
}

export { SliderConfig }