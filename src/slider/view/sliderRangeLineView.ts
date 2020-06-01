class SliderRangeLineView {
  private PARENT: SliderView
  private config: SliderConfig
  private CLASSES: SliderClasses
  public ROOT: HTMLElement
  private range: {
    leftHandleValue: number
    rightHandleValue: number
  }

  constructor(parent: SliderView) {
    this.PARENT = parent
    this.config = this.PARENT.getConfig()
    this.CLASSES = this.PARENT.CLASSES
    this.ROOT = this.createRootElement()
    this.range = this.getDefaultRange()
    this.render()
  }

  private createRootElement() {
    let root = document.createElement("div")
    root.classList.add(this.CLASSES.RANGE_LINE)
    if (this.config.isVertical) root.classList.add(this.CLASSES.RANGE_LINE_VERTICAL)
    return root
  }

  private getDefaultRange() {
    return {
      leftHandleValue: this.config.leftHandleValue,
      rightHandleValue: this.config.rightHandleValue
    }
  }

  public setRange(leftHandleValue: number, rightHandleValue: number) {
    this.range = {
      leftHandleValue: leftHandleValue,
      rightHandleValue: rightHandleValue
    }
    this.render()
  }

  private render() {
    if (this.config.isVertical) {
      this.ROOT.style.top = `${this.calculateRightShift()}px`
      this.ROOT.style.bottom = `${this.calculateLeftShift()}px`
    }
    else {
      this.ROOT.style.left = `${this.calculateLeftShift()}px`
      this.ROOT.style.right = `${this.calculateRightShift()}px`
    }
  }

  private calculateLeftShift() {
    let sliderRange: number
    if (this.config.hasDefaultValues) sliderRange = this.config.defaultValues.length - 1
    else sliderRange = this.config.maxValue - this.config.minValue
    let position = this.range.leftHandleValue / sliderRange

    if (this.config.isVertical) return position * this.PARENT.ROOT.clientHeight
    else return position * this.PARENT.ROOT.clientWidth
  }

  private calculateRightShift() {
    let sliderRange: number
    if (this.config.hasDefaultValues) sliderRange = this.config.defaultValues.length - 1
    else sliderRange = this.config.maxValue - this.config.minValue
    let position = this.range.rightHandleValue / sliderRange

    if (this.config.isVertical) return this.PARENT.ROOT.clientHeight - position * this.PARENT.ROOT.clientHeight
    else return this.PARENT.ROOT.clientWidth - position * this.PARENT.ROOT.clientWidth
  }
}

export { SliderRangeLineView }