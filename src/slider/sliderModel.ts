import { SliderConfig } from "./sliderConfig"

class SliderModel {
  private config: SliderConfig

  constructor (config: SliderConfig) {
    this.config = config
  }

  public calculateLeftHandleValue(position: number): number {
    if (this.config.hasDefaultValues.get()) this.config.leftHandleValue.set(this.calculateDefaultValue(position))
    else this.config.leftHandleValue.set(this.calculateValue(position))

    return this.config.leftHandleValue.get() as number
  }

  public calculateRightHandleValue(position: number): number {
    if (this.config.hasDefaultValues.get()) this.config.rightHandleValue.set(this.calculateDefaultValue(position))
    else this.config.rightHandleValue.set(this.calculateValue(position))

    return this.config.rightHandleValue.get() as number
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
}

export { SliderModel }