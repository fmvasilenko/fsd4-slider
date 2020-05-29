class SliderModel {
  private CONTROLLER: Slider
  private config: SliderConfig
  private state: ModelState

  constructor(controller: Slider) {
    this.CONTROLLER = controller
    this.config = this.CONTROLLER.getConfig()
    this.state = this.getDefaultState()
  }

  private getDefaultState(): ModelState {
    return {
      leftHandleValue: this.config.minValue,
      rightHandleValue: this.config.maxValue
    }
  }

  public calculateLeftHandleValue(position: number): number {
    switch (this.config.type) {
      case "defaultValues": {
        this.state.leftHandleValue = this.calculateDefaultValue(position)
        break;
      }
      default: {
        this.state.leftHandleValue = this.calculateValue(position)
      }
    }

    if (this.state.rightHandleValue < this.state.leftHandleValue) 
      this.state.leftHandleValue = this.state.rightHandleValue
    return this.state.leftHandleValue
  }

  public calculateRightHandleValue(position: number): number {
    switch (this.config.type) {
      case "defaultValues": {
        this.state.rightHandleValue = this.calculateDefaultValue(position)
        break;
      }
      default: {
        this.state.rightHandleValue = this.calculateValue(position)
      }
    }

    if (this.state.rightHandleValue < this.state.leftHandleValue) 
      this.state.rightHandleValue = this.state.leftHandleValue
    return this.state.rightHandleValue
  }

  private calculateValue(position: number): number {
    let range = this.config.maxValue - this.config.minValue
    let value = Math.floor(position * range)

    value -= value % this.config.step + this.config.minValue
    if (value % this.config.step > this.config.step / 2) value += this.config.step

    return value
  }

  private calculateDefaultValue(position: number): number {
    if (this.config.defaultValues !== undefined)
      return Math.round((this.config.defaultValues.length - 1) * position)
    else return 0
  }
}

export { SliderModel }