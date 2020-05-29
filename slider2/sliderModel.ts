class SliderModel {
  private config: SliderConfig
  private state: SliderModelState
  private controller: Slider

  constructor(controller: Slider,config: SliderConfig) {
    this.config = config
    this.state = this.getDefaultState()
    this.controller = controller
  }

  private getDefaultState(): SliderModelState {
    return {
      leftValue: 0,
      rightValue: undefined
    }
  }

  public update(parameters: ModelParameters) {
    if (this.config.defaultValues == undefined)
      this.updateOneHandle(parameters)
    else this.updateDefaultValues(parameters)

    this.controller.changeView({leftValue: this.state.leftValue, rightValue: this.state.rightValue})
  }

  private updateOneHandle(parameters: ModelParameters) {
    let range = this.config.maxValue - this.config.minValue

    let leftValue = Math.floor(range * parameters.leftPosition / parameters.length)
    this.state.leftValue = leftValue - leftValue % this.config.step + this.config.minValue
    if (leftValue % this.config.step > this.config.step / 2) this.state.leftValue += this.config.step
    if (this.state.leftValue > this.config.maxValue) this.state.leftValue -= this.config.step

    if (parameters.rightPosition !== undefined) {
      let rightValue = Math.floor(range * parameters.rightPosition / parameters.length)
      this.state.rightValue = rightValue - rightValue % this.config.step + this.config.minValue
      if (rightValue % this.config.step > this.config.step / 2) this.state.rightValue += this.config.step
      if (this.state.rightValue > this.config.maxValue) this.state.rightValue -= this.config.step
    }

    if (this.state.rightValue !== undefined && this.state.leftValue > this.state.rightValue) {
      this.state.leftValue = this.state.rightValue
    }
  }

  private updateDefaultValues(parameters: ModelParameters) {
    if (this.config.defaultValues !== undefined)
      this.state.leftValue = Math.round((this.config.defaultValues.length - 1) * parameters.leftPosition / parameters.length)
  }
}

export { SliderModel }