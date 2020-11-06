interface SliderFunction {
  (): JQuery;
}

interface JQuerySliderConfig {
  isRange: Function
  isVertical: Function
  valueLabelDisplayed: Function
}

interface ISlider extends SliderFunction {}

interface JQuery {
  config: JQuerySliderConfig
  slider: ISlider
}

interface State {
  isRange: boolean
  isVertical: boolean
  valueLabelDisplayed: boolean
  scaleDisplayed: boolean
  minValue: number
  maxValue: number
  step: number
  pointsNumber: number
  leftHandleValue: number
  rightHandleValue: number
}

interface Classes {
  root: string
  rootVertical: string
  handle: string
  handleVertical: string
  leftHandle: string
  rightHandle: string
  valueLabel: string
  leftHandleLabel: string
  leftHandleLabelVertical: string
  rightHandleLabel: string
  rightHandleLabelVertical: string
  rangeLine: string
  rangeLineVertical: string
  scaleValue: string
  scaleValueVertical: string
  scaleValueLabel: string
  scaleValueLabelVertical: string
}
