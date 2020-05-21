///<reference path="./slider.d.ts" />

class Slider {
  options: SliderOptions

  private DOM = {
    ROOT: {}
  }

  private CLASSES = {
    SLIDER_CLASS: "slider",
    HANDLE_CLASS: "slider__handle"
  }


  constructor() {
    console.log("slider")
  }
}

export {Slider}