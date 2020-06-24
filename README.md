# FSD4 Slider

This is a jQuery slider plugin

## Table of contents

1. [Basic usage](#basicUsage)
2. [Config](#config)
  1. [MinValue](#minValue)
  2. [MaxValue](#maxValue)
  3. Step
  4. Default Values
  5. Left handle value
  6. Right handle value
3. Range mode
4. Default values mode
5. Vertical mode
6. Hide limits
7. Hide value label


<a name="basicUsage"></a>

## 1. Basic usage

To turn div block into a slider use 
```js
$(element).slider()
```

<a name="config"></a>

## 2. Config

To controll the slider provide config object:
```js
$(element).slider({
  //parameters
})
```

By default slider will be created with following parameters:
```js
{
minValue: 0,
maxValue: 100,
step: 1,
defaultValues: ["first", "second", "third"],
leftHandleValue: 20,
rightHandleValue: 80,
isRange: false,
hasDefaultValues: false,
isVertical: false,
limitsDisplayed: true,
valueLabelDisplayed: true
}
```

#### Controll slider "in action"
To controll slider "in action" jQuery object will have a config property
```js
let slider = $(element).slider()

//changing leftHandlevalue, using config property
slider.config.leftHandleValue(40)
```
The function will check the value, change it if needed and return the right one.
For example:
```js
let slider = $(element).slider({
  minValue: 0,
  maxValue: 100,
  leftHandleValue: 20
})

//lefthandleValue will be changed to minValue because given value is lower then minValue
let leftHandleValue = slider.config.leftHandleValue(-10)

alert(leftHandleValue) // 0
```

#### Getting a property
To get value use the same function with no arguments:
```js
let slider = $(element).slider()

//returns current leftHandleValue
slider.config.leftHandleValue()
```

<a name="minValue"></a>

### 2.1 MinValue

##### Initialization:
You can choose any minValue you want

##### "In action":
minValue cannot be lower then maxValue or it will be changed to maxValue


<a name="maxValue"></a>

### 2.2 MaxValue

##### Initialization:
maxValue cannot be lower then minValue and will be changed to minValue if it is so

##### "In action":
The same for "in action" change