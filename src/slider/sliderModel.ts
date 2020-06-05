class SliderModel {
  private config: SliderConfig
  private state: ModelState

  constructor(config: SliderConfig) {
    this.config = this.checkConfig(config)
    this.state = this.getDefaultState()
  }

  private checkConfig(config: SliderConfig): SliderConfig {
    if (config.maxValue < config.minValue) config.maxValue = config.minValue

    if (config.hasDefaultValues == true) {
      if (config.leftHandleValue < 0) config.leftHandleValue = 0
      if (config.leftHandleValue > config.defaultValues.length - 1) config.leftHandleValue = config.defaultValues.length - 1
    }
    else {
      if (config.leftHandleValue < config.minValue) config.leftHandleValue = config.minValue
      if (config.leftHandleValue > config.maxValue) config.leftHandleValue = config.maxValue
    }

    if (config.rightHandleValue < config.leftHandleValue) config.rightHandleValue = config.leftHandleValue

    if (config.hasDefaultValues) {
      if (config.rightHandleValue > config.defaultValues.length - 1) config.rightHandleValue = config.defaultValues.length - 1
    }
    else {
      if (config.rightHandleValue > config.maxValue) config.rightHandleValue = config.maxValue
    }

    return config
  }

  public getConfig(): SliderConfig {
    return this.config
  }

  private getDefaultState(): ModelState {
    return {
      leftHandleValue: this.config.leftHandleValue,
      rightHandleValue: this.config.rightHandleValue
    }
  }

  public calculateLeftHandleValue(position: number): number {
    if(position < 0) position = 0
    if(position > 1) position = 1

    if (this.config.hasDefaultValues) {
      this.state.leftHandleValue = this.calculateDefaultValue(position)
    }
    else {
      this.state.leftHandleValue = this.calculateValue(position)
    }

    if (this.state.rightHandleValue < this.state.leftHandleValue) 
      this.state.leftHandleValue = this.state.rightHandleValue
    return this.state.leftHandleValue
  }

  public calculateRightHandleValue(position: number): number {
    if (position > 1) position = 1

    if (this.config.hasDefaultValues) {
      if (this.config.isRange == false) return this.config.defaultValues.length - 1
      else this.state.rightHandleValue = this.calculateDefaultValue(position)
    }
    else {
      if (this.config.isRange == false) return this.config.maxValue
      this.state.rightHandleValue = this.calculateValue(position)
    }

    if (this.state.rightHandleValue < this.state.leftHandleValue) 
      this.state.rightHandleValue = this.state.leftHandleValue
    return this.state.rightHandleValue
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

  public setLeftHandleValue(value: number) {
    this.state.leftHandleValue = value
  }

  public setRightHandleValue(value: number) {
    this.state.rightHandleValue = value
  }

  public getLeftHandleValue(): number {
    return this.state.leftHandleValue
  }

  public getRightHandleValue(): number {
    return this.state.rightHandleValue
  }
}

export { SliderModel }