///<reference path="./view/sliderView.d.ts" />

class SliderHandleView {
  private parent: ISliderView
  private config: SliderConfig
  public ROOT: HTMLElement
  private state: SliderHandleState

  constructor(parent: ISliderView, rootClass: string, config: SliderConfig) {
    this.config = config
    this.parent = parent
    this.state = this.getDefaultState()
    this.ROOT = this.createRootElement(rootClass)
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
    let length = this.parent.ROOT.offsetWidth
    if (this.config.defaultValues === undefined)
      return length * (this.state.value - this.config.minValue) / (this.config.maxValue - this.config.minValue)
    else
      return this.state.value * length / (this.config.defaultValues.length - 1)
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