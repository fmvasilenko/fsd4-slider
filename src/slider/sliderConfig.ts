import { SliderConfigItem } from "./sliderConfigItem"

interface ImportedSliderConfig {
  isRange: boolean
  hasDefaultValues: boolean
  isVertical: boolean
  valueLabelDisplayed: boolean
  limitsDisplayed: boolean
  minValue: number
  maxValue: number
  step: number
  leftHandleValue: number
  rightHandleValue: number
  defaultValues: number[] | string[]
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

  constructor(importedConfig: ImportedSliderConfig) {
    this.isRange = this.setIsRange(importedConfig.isRange)
    this.hasDefaultValues = this.setHasDefaultValues(importedConfig.hasDefaultValues)
    this.isVertical = this.boolean(importedConfig.isVertical)
    this.valueLabelDisplayed = this.boolean(importedConfig.valueLabelDisplayed)
    this.limitsDisplayed = this.boolean(importedConfig.limitsDisplayed)
    this.minValue = this.setMinValue(importedConfig.minValue)
    this.maxValue = this.setMaxValue(importedConfig.maxValue)
    this.step = this.setStep(importedConfig.step)
    this.defaultValues = this.setDefaultValues(importedConfig.defaultValues)
    this.leftHandleValue = this.setLeftHandleValue(importedConfig.leftHandleValue)
    this.rightHandleValue = this.setRightHandleValue(importedConfig.rightHandleValue)
  }

  private boolean(value: boolean): SliderConfigItem {
    return new SliderConfigItem(value)
  }

  private setIsRange(value: boolean): SliderConfigItem {
    return new SliderConfigItem(value, this.checkIsRange.bind(this))
  }

  private setHasDefaultValues(value: boolean): SliderConfigItem {
    return new SliderConfigItem(value, this.checkHasDefaultValues.bind(this))
  }

  private setMinValue(value: number): SliderConfigItem {
    return new SliderConfigItem(value, this.checkMinValue.bind(this))
  }

  private setMaxValue(value: number): SliderConfigItem {
    if (value < this.minValue.get()) value = this.minValue.get() as number
    return new SliderConfigItem(value, this.checkMaxValue.bind(this))
  }

  private setStep(step: number): SliderConfigItem {
    if (step < 1) step = 1
    return new SliderConfigItem(step, this.checkStep.bind(this))
  }

  private setDefaultValues(values: number[] | string[]): SliderConfigItem {
    return new SliderConfigItem(values)
  }

  private setLeftHandleValue(value: number): SliderConfigItem {
    if (this.hasDefaultValues.get() == true) {
      if (value < 0) value = 0
      let defaultValuesSize = (this.defaultValues.get() as number[] | string[]).length
      if (value > defaultValuesSize - 1) value = defaultValuesSize - 1
    }
    else {
      if (value < this.minValue.get()) value = this.minValue.get() as number
      if (value > this.maxValue.get()) value = this.maxValue.get() as number
    }
    return new SliderConfigItem(value, this.checkLeftHandleValue.bind(this))
  }

  private setRightHandleValue(value: number): SliderConfigItem {
    if (this.isRange.get()) {
      if (value < this.leftHandleValue.get()) value = this.leftHandleValue.get() as number
      if (value > this.maxValue.get()) value = this.maxValue.get() as number
      if (this.hasDefaultValues.get()) {
        let defaultValuesSize = (this.defaultValues.get() as number[] | string[]).length
        if (value > defaultValuesSize - 1) value = defaultValuesSize - 1
      }
    }
    else {
      let defaultValuesSize = (this.defaultValues.get() as number[] | string[]).length
      if (this.hasDefaultValues.get()) value = defaultValuesSize - 1
      else value = this.maxValue.get() as number
    }
    return new SliderConfigItem(value, this.checkRightHandleValue.bind(this))
  }

  private checkIsRange(value: boolean): boolean {
    if (value == true) {
      if(this.rightHandleValue.get() < this.leftHandleValue.get()) this.rightHandleValue.set(this.leftHandleValue.get())
    }
    else {
      if (this.hasDefaultValues.get()) {
        let defaultValuesSize = (this.defaultValues.get() as number[] | string[]).length
        this.rightHandleValue.set(defaultValuesSize - 1)
      }
      else {
        this.rightHandleValue.set(this.maxValue.get())
      }
    }
    return value
  }

  private checkHasDefaultValues(value: boolean): boolean {
    if (value == true) {
      if (this.rightHandleValue.get() < 0) this.rightHandleValue.set(0)
      if (this.leftHandleValue.get() < 0) this.leftHandleValue.set(0)
      let defaultValuesSize = (this.defaultValues.get() as number[] | string[]).length
      if (this.leftHandleValue.get() > defaultValuesSize - 1) this.leftHandleValue.set(defaultValuesSize - 1)
      if (this.rightHandleValue.get() > defaultValuesSize - 1) this.rightHandleValue.set(defaultValuesSize - 1)
      if (this.rightHandleValue.get() < this.leftHandleValue.get()) this.rightHandleValue.set(this.leftHandleValue.get())
    }
    else {

    }
    return value
  }

  private checkMinValue(value: number): number {
    if (value > this.maxValue.get()) value = this.maxValue.get() as number
    if (value > this.leftHandleValue.get()) this.leftHandleValue.set(value)
    if (value > this.rightHandleValue.get()) this.rightHandleValue.set(value)
    return value
  }

  private checkMaxValue(value: number): number {
    if (value < this.minValue.get()) value = this.minValue.get() as number
    if (value < this.leftHandleValue.get()) this.leftHandleValue.set(value)
    if (this.isRange.get() === true) {
      if (value < this.rightHandleValue.get()) this.rightHandleValue.set(value)
    }
    return value
  }

  private checkStep(step: number): number {
    if (step < 1) step = 1
    return step
  }

  private checkLeftHandleValue(value: number): number {
    if (this.hasDefaultValues.get()) {
      if (value < 0) value = 0
      let defaultValuesSize = (this.defaultValues.get() as number[] | string[]).length
      if (value > defaultValuesSize - 1) value = defaultValuesSize - 1
    }
    else {
      if (value < this.minValue.get()) value = this.minValue.get() as number
      if (value > this.maxValue.get()) value = this.maxValue.get() as number
    }

    if (this.isRange.get()) {
      if (value > this.rightHandleValue.get()) value = this.rightHandleValue.get() as number
    }

    return value
  }

  private checkRightHandleValue(value: number): number {
    if (this.isRange.get()) {
      if (this.hasDefaultValues.get()) {
        let defaultValuesSize = (this.defaultValues.get() as number[] | string[]).length
        if (value > defaultValuesSize - 1) value = defaultValuesSize - 1
      }
      else {
        if (value > this.maxValue.get()) value = this.maxValue.get() as number
      }
      if (value < this.leftHandleValue.get()) value = this.leftHandleValue.get() as number
    }
    else {
      value = this.maxValue.get() as number
    }
    return value
  }
}

export { SliderConfig }