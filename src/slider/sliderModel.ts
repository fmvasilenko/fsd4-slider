import { SliderConfig } from "./sliderConfig"

class SliderModel {
  private config: SliderConfig

  constructor (config: SliderConfig) {
    this.config = config
  }

  private calculateLeftHandleValue(position: number) {
    if(position < 0) position = 0
    if(position > 1) position = 1

    if (this.config.hasDefaultValues) this.config.leftHandleValue.set(this.calculateDefaultValue(position))
    else this.config.leftHandleValue.set(this.calculateValue(position))

    //if (this.config.rightHandleValue < this.config.leftHandleValue) this.config.leftHandleValue = this.config.rightHandleValue

    return this.config.leftHandleValue
  }

  private calculateValue(position: number): number {
    let minValue = this.config.minValue.get() as number
    let maxValue = this.config.maxValue.get() as number
    let step = this.config.step.get() as number

    let range = maxValue - minValue
    let value = Math.floor(position * range)

    if (value % step > step / 2) value += step
    value = value - value % step + minValue

    return value
  }

  private calculateDefaultValue(position: number): number {
    if (this.config.defaultValues !== undefined) {
      let defaultValuesLength = (this.config.defaultValues.get() as number[] | string[]).length
      return Math.round((defaultValuesLength - 1) * position)
    }
    else return 0
  }

  /*constructor(config?: ImportedSliderConfig) {
    this.config = this.createConfig(config)
  }

  private createConfig(importedConfig?: ImportedSliderConfig) {
    let config = Object.assign({}, this.getDefaultConfig(), importedConfig)
    config = this.checkConfig(config)
    return config
  }

  private getDefaultConfig(): SliderConfig {
    return {
      isRange: false,
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

  private checkConfig(config: SliderConfig): SliderConfig {
    if (config.maxValue < config.minValue) config.maxValue = config.minValue
    if (config.step < 1) config.step = 1

    if (config.hasDefaultValues == true) {
      if (config.leftHandleValue < 0) config.leftHandleValue = 0
      if (config.leftHandleValue > config.defaultValues.length - 1) config.leftHandleValue = config.defaultValues.length - 1
      if (config.rightHandleValue > config.defaultValues.length - 1) config.rightHandleValue = config.defaultValues.length - 1
      if (config.isRange == false) config.rightHandleValue = config.defaultValues.length - 1
    }
    else {
      if (config.leftHandleValue < config.minValue) config.leftHandleValue = config.minValue
      if (config.leftHandleValue > config.maxValue) config.leftHandleValue = config.maxValue
      if (config.rightHandleValue > config.maxValue) config.rightHandleValue = config.maxValue
      if (config.isRange == false) config.rightHandleValue = config.maxValue
    }

    if (config.rightHandleValue < config.leftHandleValue) config.rightHandleValue = config.leftHandleValue

    return config
  }

  public getConfig(): SliderConfig {
    return Object.assign({}, this.config)
  }

  public calculateLeftHandleValue(position: number): number {
    if(position < 0) position = 0
    if(position > 1) position = 1

    if (this.config.hasDefaultValues) this.config.leftHandleValue = this.calculateDefaultValue(position)
    else this.config.leftHandleValue = this.calculateValue(position)

    if (this.config.rightHandleValue < this.config.leftHandleValue) this.config.leftHandleValue = this.config.rightHandleValue

    return this.config.leftHandleValue
  }

  public calculateRightHandleValue(position: number): number {
    if (position > 1) position = 1

    if (this.config.hasDefaultValues) {
      if (this.config.isRange == false) return this.config.defaultValues.length - 1
      else this.config.rightHandleValue = this.calculateDefaultValue(position)
    }
    else {
      if (this.config.isRange == false) return this.config.maxValue
      else this.config.rightHandleValue = this.calculateValue(position)
    }

    if (this.config.rightHandleValue < this.config.leftHandleValue) this.config.rightHandleValue = this.config.leftHandleValue

    return this.config.rightHandleValue
  }

  private calculateValue(position: number): number {
    let range = this.config.maxValue - this.config.minValue
    let value = Math.floor(position * range)

    if (value % this.config.step > this.config.step / 2) value += this.config.step
    value = value - value % this.config.step + this.config.minValue

    return value
  }

  private calculateDefaultValue(position: number): number {
    if (this.config.defaultValues !== undefined)
      return Math.round((this.config.defaultValues.length - 1) * position)
    else return 0
  }

  public setLeftHandleValue(value: number): number {
    this.config.leftHandleValue = this.checkLeftHandleValue(value, this.config)
    return this.config.leftHandleValue
  }

  public setRightHandleValue(value: number) {
    this.config.rightHandleValue = this.checkRightHandleValue(value, this.config)
    return this.config.rightHandleValue
  }

  private checkLeftHandleValue(value: number, config: SliderConfig): number {
    if (config.hasDefaultValues) {
      if (`${value}` === "NaN") value = 0
      if (value < 0) value = 0
      if (value > config.defaultValues.length - 1) value = config.defaultValues.length - 1
    }
    else {
      if (`${value}` === "NaN") value = config.minValue
      if (value < config.minValue) value = config.minValue
      if (value > config.maxValue) value = config.maxValue
    }

    if (config.isRange) 
      if (value > config.rightHandleValue) value = config.rightHandleValue

    return value
  }

  private checkRightHandleValue(value: number, config: SliderConfig): number {
    if (config.hasDefaultValues) {
      if (`${value}` === "NaN") value = config.defaultValues.length - 1
      if (value > config.defaultValues.length - 1) value = config.defaultValues.length - 1
    }
    else {
      if (`${value}` === "NaN") value = config.maxValue
      if (value > config.maxValue) value = config.maxValue
      if (config.isRange == false) value = config.maxValue
    }

    if (value < config.leftHandleValue) value = config.leftHandleValue

    return value
  }

  public getLeftHandleValue(): number {
    return this.config.leftHandleValue
  }

  public getRightHandleValue(): number {
    return this.config.rightHandleValue
  }*/
}

export { SliderModel }