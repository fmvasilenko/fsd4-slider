///<reference path="./view/sliderView.d.ts" />

class SliderHandleView {
  private parent: ISliderView
  private config: SliderHandleConfig
  public ROOT: HTMLElement
  private state: SliderHandleState

  constructor(parent: ISliderView, container: HTMLElement, rootClass: string, config?: SliderHandleConfig) {
    let defaultConfig: SliderHandleConfig = {
      isRange: false,
      position: ""
    }
    this.config = Object.assign(defaultConfig, config)
    this.parent = parent
    this.state = this.getDefaultState();
    this.ROOT = this.createRootElement(rootClass)
  }

  private getDefaultState(): SliderHandleState {
    return {
      drag: false,
      position: 0
    }
  }

  private createRootElement(rootClass: string): HTMLElement {
    let handle = document.createElement("div")
    handle.classList.add(rootClass)
    return handle
  }

  public drag() {
    this.state.drag = true
  }

  public drop() {
    this.state.drag = false
  }

  public move(event: MouseEvent) {
    this.state.position = this.calculateHandlePosition(event)
    this.ROOT.style.left = `${this.state.position}px`
  }

  private calculateHandlePosition(event: MouseEvent): number {
    let x = event.pageX
    let scaleBeginning = this.parent.ROOT.getBoundingClientRect().left
    let length = this.parent.ROOT.offsetWidth

    if (x < scaleBeginning) return 0
    else if (x > scaleBeginning + length) return length
    else return x - scaleBeginning
  }

  public isDragged(): boolean {
    return this.state.drag
  }

  public getPosition(): number {
    return this.state.position
  }
}

export { SliderHandleView }