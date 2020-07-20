# FSD4 Slider

This is a jQuery slider plugin

## Table of contents

1. [Basic usage](#basicUsage)
2. [Config](#config)
    1. [MinValue](#minValue)
    2. [MaxValue](#maxValue)
    3. [Step](#step)
    4. [Default values](#defaultValues)
    5. [Left handle value](#leftHandleValue)
    6. [Right handle value](#rightHandleValue)
3. [Range mode](#rangeMode)
4. [Default values mode](#defaultValuesMode)
5. [Vertical mode](#verticalMode)
6. [Hide limits](#hideLimits)
7. [Hide value label](#hideValueLabel)
8. [Callback function](#callbackFunction)
9. [Architecture](https://github.com/fmvasilenko/FSD4_Slider/blob/master/docs/architecture.md)


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


<a name="defaultValues"></a>


### 2.4 Default values

defaultValues contains number or string array.
If hasDefaultValues === true, handle values will contain indexes for defaultValues array

##### Initialization:
```js
{
  defaultValues: ["first", "second", "third"]
}
```

##### "In action":
```js
slider.config.defaultValues(["first", "second", "third"])
```


<a name="leftHandleValue"></a>


### 2.5 Left handle value

##### Initialization:
If hasDefaultValues === false, leftHandleValue cannot be lower then minValue and higher then maxValue
If hasDefaultValues === true, leftHandleValue cannot be lower then 0 and higher then defaultValues.length - 1
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

If isRange === false, rightHandleValue will also contain maxValue or defaultValues.length -1 if hasDefaultValues === true

##### Initialization:
If hasDefaultValues === false, rightHandleValue cannot be lower then minValue and higher then maxValue
If hasDefaultValues === true, rightHandleValue cannot be lower then 0 and higher then defaultValues.length - 1
```js
{
  rightHandleValue: 80
}
```

##### "In action":
The same as for initialization but if isRange === true, rightHandleValue cannot be lower then leftHandleValue
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
but rightHandle object will still exist and contain maxValue or defaultValues.length - 1


<a name="defaultValuesMode"></a>


## 4. Default values mode

In default values mode slider uses defaultValues instead of calculating value accroding with step, minValue and maxValue

Can be switched on and off by
```js
{
  hasDefaultValues: true
}
```

For "in action" change use
```js
slider.config.hasDefaultValues(newValue)
```

When it`s on, minValue and maxValue will be ignored.
Can be used with range and vertical modes

> Notice!
> When hasDefaultValues === true, limitsDisplayed will be automatically turned off


<a name="verticalMode"></a>


## 5. Vertical mode

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


<a name="hideLimits"></a>


## 6. Hide limits

In this mode slider hides or shows minValue and maxValue labels

Can be switched on and off by
```js
{
  limitsDisplayed: true
}
```

For "in action" change use
```js
slider.config.limitsDisplayed(newValue)
```

> Notice!
> When turned on, hasDefaultValues will be turned off automatically


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


<a name="callbackFunction"></a>


## 7. Callback function

This function will be called if leftHandleValue or rightHandleValue are changed.
```js
//function will receive leftHandleValue and rightHandleValue as parameters
function callbackFunction(leftHandleValue, rightHandleValue) {
  //some code
}

//it should be given to slider while initializing as a second parameter
$(element).slider(config, callbackFunction)
```