import "./slider/slider.scss"
import { Slider } from "./slider/slider"

$.fn.slider = function (this: JQuery, options?: ImportedSliderConfig, slide?: SliderCallBackFunction) {
  
  let slider = new Slider(this[0], options, slide)

  this.setValue = slider.setLeftHandleValue.bind(slider)
  this.setFirstValue = slider.setLeftHandleValue.bind(slider)
  this.setSecondValue = slider.setRightHandleValue.bind(slider)
  this.getFirstValue = slider.getLeftHandleValue.bind(slider)
  this.getSecondValue = slider.getRightHandleValue.bind(slider)

  return this
}

let mySlider = $(".block").slider({

}, function(firstValue: number, secondValue: number) {
  console.log(`${firstValue} ${secondValue}`)
})

mySlider.setValue(5)
mySlider.setSecondValue(80)

console.log(mySlider.getFirstValue())
console.log(mySlider.getSecondValue())

console.log("ts works")