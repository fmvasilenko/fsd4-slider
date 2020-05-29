import "./slider/slider.scss"
import { Slider } from "./slider/slider"

$.fn.slider = function (this: JQuery, options?: number) {
  
  let slider = new Slider(this[0])
  console.log(slider)

  return this
}

$(".block").slider()

console.log("ts works")