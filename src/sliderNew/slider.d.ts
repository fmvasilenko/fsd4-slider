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
  rangeLine: string
  rangeLineVertical: string
  scaleValue: string
  scaleValueVertical: string
  scaleValueLabel: string
  scaleValueLabelVertical: string
}
