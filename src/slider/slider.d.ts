interface ISliderView {
  ROOT: HTMLElement
}

interface SliderViewConfig {
  isRange: boolean
}

interface SliderViewState {
  dragLeftHandle: boolean,
  dragRightHandle: boolean
}

interface SliderHandleConfig {
  isRange: boolean,
  position: string
}

interface SliderHandleState {
  drag: boolean,
  position: number
}

interface SliderConfig {
  isRange?: boolean,
  minValue?: number,
  maxValue?: number
}

interface SliderFunction {
  (config?: SliderConfig): JQuery;
}

interface JQuery {
  slider: Slider;
}

interface Slider extends SliderFunction {
  //ROOT?: HTMLElement
  //MODEL?: SliderModel
  //VIEW?: SliderView
  //config?: SliderConfig
}

interface ModelParameters {

}