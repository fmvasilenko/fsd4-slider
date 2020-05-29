interface SliderFunction {
  (config?: number): JQuery;
}

interface JQuery {
  slider: ISlider;
}

interface ISlider extends SliderFunction {}

interface Slider {
  ROOT: HTMLElement
  getConfig(): SliderConfig
  calculateLeftHandleValue(position: number): number
  calculateRightHandleValue(position: number): number
}

interface SliderConfig {
  type: string
  minValue: number
  maxValue: number
  step: number
  leftHandleValue: number
  rightHandleValue: number
  defaultValues: number[] | string[] | undefined
}

interface SliderClasses {
  SLIDER: string
  HANDLE: string
  LEFT_HANDLE: string
  RIGHT_HANDLE: string
  MAX_VALUE: string
  MIN_VALUE: string
  VALUE_LABEL: string
  LEFT_HANDLE_VALUE_LABEL: string
  RIGHT_HANDLE_VALUE_LABEL: string
  DEFAULT_VALUE: string
}

interface SliderView {
  ROOT: HTMLElement
  CLASSES: SliderClasses
  getConfig(): SliderConfig
}

interface HandleState {
  isDragged: boolean,
  value: number
}

interface ModelState {
  leftHandleValue: number
  rightHandleValue: number
}