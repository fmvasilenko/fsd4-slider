# FSD4 Slider

This is a jQuery slider plugin.  
[Demo page](https://fmvasilenko.github.io/fsd4-slider/)  
  
### NPM
To install as a plugin use:
```
npm install fsd4-slider
```
  
> Notice! Tests are not included in plugin package!

To add plugin to the project use:
```js
import 'fsd4-slider';
import 'fsd4-slider/slider.css';
```
  
### Git clone
After downloading run
```
npm install
```

To run development mode use
```
npm run dev
```

To build the project use
```
npm run build
```

To test use:
```
npm test
```

## Table of contents

1. [Basic usage](#basicUsage)
2. [Config](#config)
    1. [MinValue](#minValue)
    2. [MaxValue](#maxValue)
    3. [Step](#step)
    4. [Left handle value](#leftHandleValue)
    5. [Right handle value](#rightHandleValue)
3. [Range mode](#rangeMode)
4. [Vertical mode](#verticalMode)
5. [Hide scale](#hideScale)
6. [Points number](#pointsNumber)
7. [Hide value label](#hideValueLabel)
8. [Callback functions](#callbackFunctions)


<a name="basicUsage"></a>

## 1. Basic usage

To turn div block into a slider use 
```js
$(element).slider()
```

<a name="config"></a>

## 2. Config

To controll the slider use config object:
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
  leftHandleValue: 20,
  rightHandleValue: 80,
  isRange: false,
  isVertical: false,
  scaleDisplayed: true,
  valueLabelDisplayed: true
}
```


#### Controll slider "in action"
To controll slider "in action" jQuery object will have a config property
```js
let slider = $(element).slider()

// changing leftHandlevalue, using config property
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

// lefthandleValue will be changed to minValue because given value is lower then minValue
let leftHandleValue = slider.config.leftHandleValue(-10)

alert(leftHandleValue) // 0
```


#### Getting a property
To get value use the same function with no arguments:
```js
let slider = $(element).slider()

// returns current leftHandleValue
slider.config.leftHandleValue()
```

<a name="minValue"></a>


### 2.1 MinValue

##### Initialization:
You can choose any minValue you want
```js
{
  minValue: 0
}
```

##### "In action":
minValue cannot be higher then maxValue or it will be changed to maxValue
```js
slider.config.minValue(newValue)
```


<a name="maxValue"></a>


### 2.2 MaxValue

##### Initialization:
maxValue cannot be lower then minValue or it will be changed to minValue
```js
{
  maxValue: 100
}
```

##### "In action":
The same as for initialization
```js
slider.config.maxValue(newValue)
```


<a name="step"></a>


### 2.3 Step

##### Initialization:
step cannot be lower then 1 or it will be change to 1
```js
{
  step: 1
}
```

##### "In action":
The same as for initialization
```js
slider.config.step(newValue)
```


<a name="leftHandleValue"></a>


### 2.4 Left handle value

##### Initialization:
leftHandleValue cannot be lower then minValue and higher then maxValue
```js
{
  leftHandleValue: 20
}
```

##### "In action":
The same as for initialization but if isRange === true, leftHandleValue cannot be higher then rightHandleValue
```js
slider.config.leftHandleValue(20)
```


<a name="rightHandleValue"></a>


### 2.5 Right handle value

If isRange === false, rightHandleValue will contain maxValue

##### Initialization:
rightHandleValue cannot be lower then leftHandleValue and higher then maxValue
```js
{
  rightHandleValue: 80
}
```

##### "In action":
The same as for initialization.
```js
slider.config.rightHandleValue(80)
```


<a name="rangeMode"></a>


## 3. Range mode

In range mode rightHandle will be appended to the scale.
To initialize it use:
```js
{
  isRange: true
}
```

Or, for "in action" changing:
```js
slider.config.isRange(newValue)
```

If isRange === false, rightHandle will be removed from the scale, 
but rightHandle object will still exist and contain maxValue


<a name="verticalMode"></a>


## 4. Vertical mode

Switching between vertical and horizontal modes

Can be switched on and off by
```js
{
  isVertical: true
}
```

For "in action" change use
```js
slider.config.isVertical(newValue)
```


<a name="hideScale"></a>


## 5. Hide scale

In this mode slider hides or shows scale labels

Can be switched on and off by
```js
{
  scaleDisplayed: true
}
```

For "in action" change use
```js
slider.config.scaleDisplayed(newValue)
```


<a name="pointsNumber"></a>

## 6. Points number

Scale points number. If it`s lower then possible values number with current step - steps number will be used instead.

##### Initialization:
Cannot be lower then 2 (minValue and maxValue)
```js
{
  pointsNumber: 5
}
```

##### "In action":
The same as for initialization
```js
slider.config.pointsNumber(10)
```


<a name="hideValueLabel"></a>


## 7. Hide value label

In this mode slider hides or shows value labels above the handles

Can be switched on and off by
```js
{
  valueLabelDisplayed: true
}
```

For "in action" change use
```js
slider.config.valueLabelDisplayed(newValue)
```


<a name="callbackFunctions"></a>


## 8. Callback functions

`setLeftHandleSubscriber` and `setRigthHandleSubscriber` methods can be used to subscribe to `leftHandleValue` and `rightHandleValue`.

```ts
leftHandleSubscriber(value: number) {
  // code
}

rightHandleSubscriber(value: number) {
  // code
}

slider.config.setLeftHandleSubscriber(leftHandleSubscriber);
slider.config.setRightHandleSubscriber(rightHandleSubscriber);
```
