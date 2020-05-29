interface ISliderView {
  ROOT: HTMLElement
}

interface SliderViewConfig {
  isRange: boolean
}

interface SliderViewState {
  dragLeftHandle: boolean,
  dragRightHandle: boolean,
  leftPosition: number,
  rightPosition: number
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
  defaultValues?: number[] | string[] | undefined
}

interface SliderConfig {
  isRange: boolean,
  minValue: number,
  maxValue: number,
  step: number,
  value: number,
  defaultValues: number[] | string[] | undefined
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
  changeView(state: SliderModelState): void
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