class SliderModel {
  private CONTROLLER: SliderController
  private config: SliderConfig
  private state: ModelState

  constructor(controller: SliderController) {
    this.CONTROLLER = controller
    this.config = this.CONTROLLER.getConfig()
    this.state = this.getDefaultState()
  }

  private getDefaultState(): ModelState {
    return {
      leftHandleValue: this.config.leftHandleValue,
      rightHandleValue: this.config.rightHandleValue
    }
  }

  public calculateLeftHandleValue(position: number): number {
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
    if (this.config.hasDefaultValues) {
      this.state.rightHandleValue = this.calculateDefaultValue(position)
    }
    else {
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