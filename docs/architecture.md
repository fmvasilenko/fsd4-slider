# Architecture

Plugin uses MVP architecture.
Most of the classes contain only private methods, which helps to avoid unnecessary data binding.
To transmit data between modules, each module is subscibed on `SliderConfig` parameters.

## Table of contents

1. [SliderConfig](#sliderConfig)
2. [SliderState](#sliderState)
3. [SliderController](#sliderController)
4. [SliderModel](#sliderModel)
5. View
    1. [SliderView](#sliderView)
    2. [SliderHandleView](#sliderHandleView)
    3. [SliderLimitView](#sliderLimitView)
    4. [SliderValueLabelView](#sliderValueLabelView)
    5. [SliderRangeLineView](#sliderRangeLineView)
    6. [SliderDefaultValueLabel](#sliderDefaultValueLabel)
6. [Diagram](https://drive.google.com/file/d/1sOsdVlcexU3EpdpMsxgbixfRdaUNzaQy/view?usp=sharing)

<a name="sliderConfig"></a>

## 1. SliderConfig

The main part of the slider is `SliderConfig`. It provides data transmittion between modules and checks data validness.
Each config parameter is an instance of `SliderConfigItem`:

```js
SliderConfigItem {
  set(newValue)
  get()
  addSubscriber(newSubscriber)
  removeSubscriber(someSubscriber)
}
```

Each time `set()` function is called - private `publish()` function calls all subscribers with current value.

```js
firstSubscriber(currentValue);
secondSubscriber(currentValue);
<...>
```

### data check

`SliderConfig` contains checking function for each parameter and also subscribes some parameters to others if needed.
For example maxValue should not be lower then minValue. And leftHandleValue should be changed if `maxValue > leftHandleValue`:

```js
private checkMaxValue(givenValue: number): number {
  return givenValue < this.minValue.get()
    ? (this.minValue.get() as number)
    : givenValue;
}

private checkLeftHandleValue(givenValue: number): number {
  <...>
  if (givenValue > this.maxValue.get()) value = this.maxValue.get();
  <...>
  return value;
}
```

```js
constructor() {
  this.maxValue.addSubscriber(this.checkLeftHandleValue.bind(this));
}
```

<a name="sliderState"></a>

## 2. SliderState

`SliderState` is basically the same with `SliderConfig` but contains `leftHandlePosition` and `rightHandlePosition`.
Both parameters represent current handle position regarding the scale, normalised from 0 to 1.

<a name="sliderController"></a>

## 3. SliderController

The main function of `SliderController` is to create `SliderModel` and `SliderView`.
It also contains `slideFunction` which is subscribed to `leftHandleValue` and `rightHandleValue`,
and calls `slide` callback function with `leftHandleValue` and `rightHandleValue`.

<a name="sliderModel"></a>

## 4. SliderModel

`SliderModel` calculates the `leftHandleValue` and `rightHandleValue`.
It can calculate current value between `minValue` and `maxValue` or current `index` for `defaultValues`
if `hasDefaultValues.get() === true`.

## 5. View

<a name="sliderView"></a>

## 5.1 SliderView

`SliderView` creates all the subViews.
It also creates slider scale and is responsible for scale events, such as click.

<a name="sliderHandleView"></a>

## 5.2 SliderHandleView

`SliderHandleView` is responsible for rendering a handle and reacting handle events.
`SliderView` always has two instances of `SliderHandleView` for left and right handle.
Right handle is not displayed and has `maxValue` or `(defaultValues.length - 1)` if `hasDefaultValue.get() === false`.

<a name="sliderLimitView"></a>

## 5.3 SliderLimitView

`SliderLimitView` is responsible for rendering a limit label and reacting limit label events.
Will be displayed only if `limitsDisplayed.get() === true` and `hasDefaultValues === true`.

<a name="sliderValueLabelView"></a>

## 5.4 SliderValueLabelView

`SliderValueLabelView` is responsible for rendering value label above a handle.
Will be displayed only if `valueLabelDisplayed.get() === true`.

<a name="sliderRangeLineView"></a>

## 5.5 SliderRangeLineView

`SliderRangeView` is responsible for rendering range line between handles.
Will be displayed only if `isRange.get() === true`.

<a name="sliderDefaultValuesLabel"></a>

## 5.6 SliderDefaultValueLabel

`SliderDefaultValueLabel` is responsible only for one default value label.
Which means that for each value from `defaultValues` will be created an instance of this class.