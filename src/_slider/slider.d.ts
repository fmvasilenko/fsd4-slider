interface SliderFunction {
  (config?: ImportedSliderConfig,
    slide?: SliderCallBackFunction): JQuery;
}

interface JQuerySliderConfig {
  isRange: Function
  hasDefaultValues: Function
  isVertical: Function
  valueLabelDisplayed: Function
  limitsDisplayed: Function
  minValue: Function
  maxValue: Function
  step: Function
  leftHandleValue: Function
  rightHandleValue: Function
  defaultValues: Function
}

interface JQuery {
  config: JQuerySliderConfig
  slider: ISlider
}

interface ISlider extends SliderFunction {}

interface ImportedSliderConfig {
  isRange?: boolean
  hasDefaultValues?: boolean
  isVertical?: boolean
  valueLabelDisplayed?: boolean
  limitsDisplayed?: boolean
  minValue?: number
  maxValue?: number
  step?: number
  leftHandleValue?: number
  rightHandleValue?: number
  defaultValues?: number[] | string[]
}

interface SliderCallBackFunction {
  (firstValue: number, secondValue: number): void
}

interface SliderClasses {
  SLIDER: string
  SLIDER_VERTICAL: string
  HANDLE: string
  HANDLE_VERTICAL: string
  LEFT_HANDLE: string
  RIGHT_HANDLE: string
  RANGE_LINE: string
  RANGE_LINE_VERTICAL: string
  MAX_VALUE: string
  MAX_VALUE_VERTICAL: string
  MIN_VALUE: string
  MIN_VALUE_VERTICAL: string
  VALUE_LABEL: string
  LEFT_HANDLE_LABEL: string
  LEFT_HANDLE_LABEL_VERTICAL: string
  RIGHT_HANDLE_LABEL: string
  RIGHT_HANDLE_LABEL_VERTICAL: string
  DEFAULT_VALUE: string
  DEFAULT_VALUE_VERTICAL: string
  DEFAULT_VALUE_LABEL: string
  DEFAULT_VALUE_LABEL_VERTICAL: string
}
