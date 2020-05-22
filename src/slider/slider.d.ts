interface SliderConfig {
  twoHandles?: boolean
}

interface SliderFunction {
  (config?: SliderConfig): JQuery;
}

interface JQuery {
  slider: Slider;
}

interface Slider extends SliderFunction {}