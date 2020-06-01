import { SliderController } from "./sliderController"

export default $.fn.slider = function (this: JQuery, options?: ImportedSliderConfig, slide?: SliderCallBackFunction) {
  
  let slider = new SliderController(this[0], options, slide)

  this.setValue = slider.setLeftHandleValue.bind(slider)
  this.setFirstValue = slider.setLeftHandleValue.bind(slider)
  this.setSecondValue = slider.setRightHandleValue.bind(slider)
  this.getFirstValue = slider.getLeftHandleValue.bind(slider)
  this.getSecondValue = slider.getRightHandleValue.bind(slider)

  return this
}