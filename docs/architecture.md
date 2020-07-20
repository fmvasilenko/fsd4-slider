# Architecture

Plugin uses MVP architecture.
Most of the classes contain only private methods, which helps to avoid unnecessary data binding.
To transmit data between modules, each module is subscibed on `SliderConfig` parameters.

## Table of contents

1. SliderConfig
2. SliderState
3. SliderController
4. SliderModel
5. View
    1. SliderView
    2. SliderHandleView
    3. SliderLimitView
    4. SliderValueLabelView
    5. SliderRangeLineView
    6. SliderDefaultValueLabel

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

## 2. SliderState

`SliderState` is basically the same with `SliderConfig` but contains `leftHandlePosition` and `rightHandlePosition`.
Both parameters represent current handle position regarding the scale, normalised from 0 to 1.

## 3. SliderController

The main function of `SliderController` is to create `SliderModel` and `SliderView`.
It also contains `slideFunction` which is subscribed to `leftHandleValue` and `rightHandleValue`,
and calls `slide` callback function with `leftHandleValue` and `rightHandleValue`.

## 4. SliderModel

`SliderModel` calculates the `leftHandleValue` and `rightHandleValue`.
It can calculate current value between `minValue` and `maxValue` or current `index` for `defaultValues`
if `hasDefaultValues.get() === true`.

## 5. View

## 5.1 SliderView

`SliderView` creates all the subViews.
It also creates slider scale and is responsible for scale events, such as click.

## 5.2 SliderHandleView

`SliderHandleView` is responsible for rendering a handle and reacting handle events.
`SliderView` always has two instances of `SliderHandleView` for left and right handle.
Right handle is not displayed and has `maxValue` or `(defaultValues.length - 1)` if `hasDefaultValue.get() === false`.

## 5.3 SliderLimitView

`SliderLimitView` is responsible for rendering a limit label and reacting limit label events.
Will be displayed only if `limitsDisplayed.get() === true` and `hasDefaultValues === true`.

## 5.4 SliderValueLabelView

`SliderValueLabelView` is responsible for rendering value label above a handle.
Will be displayed only if `valueLabelDisplayed.get() === true`.

## 5.5 SliderRangeView

`SliderRangeView` is responsible for rendering range line between handles.
Will be displayed only if `isRange.get() === true`.

## 5.6 SliderDefaultValueLabel

`SliderDefaultValueLabel` is responsible only for one default value label.
Which means that for each value from `defaultValues` will be created an instance of this class.