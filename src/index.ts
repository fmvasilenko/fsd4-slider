import "./slider/slider.scss"
import "./slider/slider"

let mySlider = $(".block").slider({

}, function(firstValue: number, secondValue: number) {
  console.log(`${firstValue} ${secondValue}`)
})

mySlider.setValue(5)
mySlider.setSecondValue(80)

console.log(mySlider.getFirstValue())
console.log(mySlider.getSecondValue())

console.log("ts works")