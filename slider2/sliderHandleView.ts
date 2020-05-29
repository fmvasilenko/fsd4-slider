///<reference path="./view/sliderView.d.ts" />

enum HandlePosition {Left, Right}

class SliderHandleView {
  private parent: ISliderView
  private config: SliderConfig
  public ROOT: HTMLElement
  private state: SliderHandleState
  private position: HandlePosition

  constructor(parent: ISliderView, rootClass: string, config: SliderConfig, position: HandlePosition) {
    this.config = config
    this.parent = parent
    this.position = position
    this.state = this.getDefaultState()
    this.ROOT = this.createRootElement(rootClass)
    this.parent.ROOT.appendChild(this.ROOT)
    this.render()
  }

  private getDefaultState(): SliderHandleState {
    return {
      drag: false,
      value: this.config.defaultValues ? 0 : this.config.value
    }
  }

  private createRootElement(rootClass: string): HTMLElement {
    let handle = document.createElement("div")
    handle.classList.add(rootClass)
    return handle
  }

  public getValue(): number {
    return this.state.value
  }

  public setValue(value: number) {
    this.state.value = value
    this.render()
  }

  private render() {
    let position = this.calculatePosition()
    this.ROOT.style.left = `${position}px`
  }

  private calculatePosition(): number {
    /*if (this.config.defaultValues === undefined)
      return length * (this.state.value - this.config.minValue) / (this.config.maxValue - this.config.minValue)
    else
      return this.state.value * length / (this.config.defaultValues.length - 1)*/

    if (this.config.defaultValues !== undefined)
      return this.calculateDefaultValuePosition()
    else if (this.config.isRange !==undefined)
      return this.calculateRangePosition()
    else return this.calculateOneHandlePosition()
  }

  private calculateDefaultValuePosition(): number {
    let length = this.parent.ROOT.offsetWidth
    return this.config.defaultValues ? this.state.value * length / (this.config.defaultValues.length - 1) : 0
  }

  private calculateRangePosition(): number {
    let position = this.calculateOneHandlePosition()

    if (this.position == HandlePosition.Left) {
      return position - this.ROOT.offsetWidth / 2
    }
    else
      return position + this.ROOT.offsetWidth / 2
  }

  private calculateOneHandlePosition(): number {
    let length = this.parent.ROOT.offsetWidth
    return length * (this.state.value - this.config.minValue) / (this.config.maxValue - this.config.minValue)
  }

  public drag() {
    this.state.drag = true
    this.ROOT.style.cursor = "grabbing"
    let body = document.querySelector("body")
    if (body !== null)
      body.style.cursor = "grabbing"
  }

  public drop() {
    this.state.drag = false
    this.ROOT.style.cursor = "default"
    let body = document.querySelector("body")
    if (body !== null)
      body.style.cursor = "default"
  }

  public isDragged(): boolean {
    return this.state.drag
  }
}

export { SliderHandleView }