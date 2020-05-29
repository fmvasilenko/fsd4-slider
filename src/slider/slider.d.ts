interface SliderFunction {
  (config?: ImportedSliderConfig): JQuery;
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

interface ImportedSliderConfig {
  isRange?: boolean
  hasDefaultValues?: boolean
  minValue?: number
  maxValue?: number
  step?: number
  leftHandleValue?: number
  rightHandleValue?: number
  defaultValues?: number[] | string[]
}

interface SliderConfig {
  isRange: boolean
  hasDefaultValues: boolean
  minValue: number
  maxValue: number
  step: number
  leftHandleValue: number
  rightHandleValue: number
  defaultValues: number[] | string[]
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