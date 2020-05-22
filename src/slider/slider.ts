///<reference path="./slider.d.ts" />
import SliderModel from "./sliderModel"
import SliderView from "./sliderView"

class Slider {
  $ROOT: JQuery
  defaultConfig: SliderConfig = {
    twoHandles: false
  }
  config: SliderConfig
  MODEL: SliderModel
  VIEW: SliderView
  DOM: {
    $FIRST_HANDLE: JQuery,
    $SECOND_HANDLE: JQuery
  }
  state: {
    firstHandleDrag: boolean,
    secondHandleDrag: boolean
  }

  constructor(root: JQuery, config?: SliderConfig) {
    this.$ROOT = root
    this.config = Object.assign({}, this.defaultConfig, config)
    this.MODEL = new SliderModel(this.$ROOT, this.config)
    this.VIEW = new SliderView(this.$ROOT, this.config)
    this.DOM = this.VIEW.DOM
    this.state = {
      firstHandleDrag: false,
      secondHandleDrag: false
    }

    console.log($(".slider__handle").length)

    this.bindEventListeners()
  }

  bindEventListeners() {
    $(document).mousemove(this.watchMouse.bind(this))
    this.$ROOT.mousedown(this.drag.bind(this))
    $(document).mouseup(this.drop.bind(this))
  }

  drag(event: JQuery.MouseDownEvent) {
    if (event.target == this.DOM.$FIRST_HANDLE[0]) {
      this.state.firstHandleDrag = true
    }
    else if (event.target == this.DOM.$SECOND_HANDLE[0]) {
      this.state.secondHandleDrag = true
    }
  }

  drop() {
    this.state.firstHandleDrag = false,
    this.state.secondHandleDrag = false
  }

  watchMouse(event: JQuery.MouseMoveEvent) {
    if (this.state.firstHandleDrag) {
      this.VIEW.state.firstHandlePosition = this.MODEL.getFirstHandlePosition(event)
      this.VIEW.render()
    }
    else if (this.state.secondHandleDrag) {
      this.VIEW.state.secondHandlePosition = this.MODEL.getPosition(event)
      this.VIEW.render()
    }
  }

}

export {Slider}