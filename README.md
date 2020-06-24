# FSD4 Slider

This is a jQuery slider plugin

## Table of contents

1. Basic usage
2. Config
  2.1 MinValue
  2.2 MaxValue
  2.3 Step
  2.4 Default Values
  2.5 Left handle value
  2.6 Right handle value
3. Range mode
4. Default values mode
5. Vertical mode
6. Hide limits
7. Hide value label


## 1. Basic usage

To turn div block into a slider use `$(element).slider()`

## 2. Config

To controll the slider provide config object:
```
$(element).slider({
  //parameters
})
```

By default slider will be created with following parameters:
```
minValue = 0
maxValue = 100
step = 1
defaultValues = ["first", "second", "third"]
leftHandleValue = 20
rightHandleValue = 80
```

To controll slider "in action" jQuery object will have a config property
```
let slider = $(element).slider()

//changing leftHandlevalue, using config property
slider.config.leftHandleValue(40)
```
The function will check the value, change if needed and return the right one.
For example:
```
let slider = $(element).slider({
  minValue: 0,
  maxValue: 100,
  leftHandleValue: 20
})

//lefthandleValue will be changed to minValue because given value is lower then minValue
let leftHandleValue = slider.config.leftHandleValue(-10)

alert(leftHandleValue) // 0
```

To get value use the same function with no arguments:
```
let slider = $(element).slider()

//returns current leftHandleValue
slider.config.leftHandleValue()
```