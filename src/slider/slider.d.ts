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
  value: number
}

interface ImportedSliderConfig {
  isRange?: boolean,
  minValue?: number,
  maxValue?: number,
  step?: number,
  value?: number,
  defaultValues?: number[] | undefined
}

interface SliderConfig {
  isRange: boolean,
  minValue: number,
  maxValue: number,
  step: number,
  value: number,
  defaultValues: number[] | undefined
}

interface SliderFunction {
  (config?: ImportedSliderConfig): JQuery;
}

interface JQuery {
  slider: ISlider;
}

interface ISlider extends SliderFunction {}

interface Slider {
  changeModel(parameters: ModelParameters): void
  changeView(value: number): void
}

interface ModelParameters {
  leftPosition: number,
  rightPosition?: number,
  length: number
}

interface SliderModelState {
  leftValue: number,
  rightValue: number | undefined
}