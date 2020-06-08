class SliderRangeLineView {
  private CONTAINER: HTMLElement
  private config: SliderConfig
  private CLASSES: SliderClasses
  public ROOT: HTMLElement
  private range: {
    leftHandleValue: number
    rightHandleValue: number
  }

  constructor(container: HTMLElement, config: SliderConfig) {
    this.CONTAINER = container
    this.config = config
    this.CLASSES = require("../sliderClasses.json")
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
      this.ROOT.style.top = `${this.calculateRightShift()}%`
      this.ROOT.style.bottom = `${this.calculateLeftShift()}%`
    }
    else {
      this.ROOT.style.left = `${this.calculateLeftShift()}%`
      this.ROOT.style.right = `${this.calculateRightShift()}%`
    }
  }

  private calculateLeftShift(): number {
    return 100 * this.calculatePosition(this.range.leftHandleValue)
  }

  private calculateRightShift(): number {
    let position = this.calculatePosition(this.range.rightHandleValue)

    if (this.range.leftHandleValue > this.range.rightHandleValue) position = this.calculateLeftShift() / 100

    return (1 - position) * 100
  }

  private calculatePosition(value: number): number {
    let sliderRange: number
    let position: number

    if (this.config.hasDefaultValues) position = value / this.config.defaultValues.length - 1
    else position = (value - this.config.minValue) / (this.config.maxValue - this.config.minValue)

    if (position < 0) position = 0
    if (position > 1) position = 1

    return position
  }
}

export { SliderRangeLineView }