import "./slider/slider.scss"
import { Slider } from "./slider/slider"

$.fn.slider = function (this: JQuery, options?: SliderConfig) {
  
  let slider = new Slider(this, options)
  console.log(slider)

  return this
}

$(".slider").slider()

console.log("ts works")