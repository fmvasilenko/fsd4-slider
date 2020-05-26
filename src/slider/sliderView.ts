///<reference path="./slider.d.ts" />
///<reference path="./view/sliderView.d.ts" />
import { SliderHandleView } from "./sliderHandleView"

class SliderView implements ISliderView {
  ROOT: HTMLElement
  private LEFT_HANDLE: SliderHandleView
  private RIGHT_HANDLE: SliderHandleView | undefined
  private CLASSES = require("./sliderClasses.json")
  private config: SliderViewConfig
  private state: SliderViewState

  constructor(root: HTMLElement, config?: SliderViewConfig) {
    this.config = Object.assign(this.getDefaultConfig(), config)
    this.state = this.getDefaultState()

    this.ROOT = root
    this.ROOT.classList.add(this.CLASSES.SLIDER)

    this.LEFT_HANDLE = this.createHandle()
    this.ROOT.appendChild(this.LEFT_HANDLE.ROOT)

    if (this.config.isRange === true) {
      this.RIGHT_HANDLE = this.createHandle("right")
      this.ROOT.appendChild(this.RIGHT_HANDLE.ROOT)
    }

    this.bindEventListeners()
  }

  private getDefaultConfig(): SliderViewConfig {
    return {
      isRange: false
    }
  }

  private getDefaultState(): SliderViewState {
    return {
      dragLeftHandle: true,
      dragRightHandle: false
    }
  }

  private createHandle(position?: string): SliderHandleView{
    if (position == "right")
      return new SliderHandleView(this, this.ROOT, this.CLASSES.HANDLE, {isRange: true, position: "right"})
    else
      return new SliderHandleView(this, this.ROOT, this.CLASSES.HANDLE, {isRange: true, position: "left"})
  }

  private bindEventListeners() {
    this.ROOT.addEventListener("mousedown", this.drag.bind(this))
    document.addEventListener("mouseup", this.drop.bind(this))
    document.addEventListener("mousemove", this.watchMouse.bind(this))
  }

  private drag(event: MouseEvent) {
    if (event.target == this.LEFT_HANDLE.ROOT)
      this.LEFT_HANDLE.drag()
    else if (this.RIGHT_HANDLE !== undefined && event.target == this.RIGHT_HANDLE.ROOT)
      this.RIGHT_HANDLE.drag()

    //this.controller
  }

  private drop() {
    this.LEFT_HANDLE.drop()
    if (this.RIGHT_HANDLE !== undefined)
      this.RIGHT_HANDLE.drop()
  }

  private watchMouse(event: MouseEvent) {
    if (this.LEFT_HANDLE.isDragged())
      this.LEFT_HANDLE.move(event)
    else if (this.RIGHT_HANDLE !== undefined && this.RIGHT_HANDLE.isDragged())
      this.RIGHT_HANDLE.move(event)
  }
}

export { SliderView }