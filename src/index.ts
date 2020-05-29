import "./slider/slider.scss"
import { Slider } from "./slider/slider"

$.fn.slider = function (this: JQuery, options?: ImportedSliderConfig) {
  
  let slider = new Slider(this[0], options)
  console.log(slider)

  return this
}

$(".block").slider({
  hasDefaultValues: true,
  leftHandleValue: 40
})

console.log("ts works")