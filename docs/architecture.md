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
6. [UML Diagram](https://drive.google.com/file/d/1sOsdVlcexU3EpdpMsxgbixfRdaUNzaQy/view?usp=sharing)

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
For example: `js sliderState.leftHandlePosition.set(0);` means that left handle is in the left position and 
supposed to be equal `minValue`.

<a name="sliderController"></a>

## 3. SliderController

The main function of `SliderController` is to create `SliderModel` and `SliderView`.
It also contains `slideFunction` which is subscribed to `leftHandleValue` and `rightHandleValue`,
and calls `slide` callback function with `leftHandleValue` and `rightHandleValue`.

```ts
class SliderController {
  constructor(root: HTMLElement, config: SliderConfig, callbackFunction: Function) {
    <...>
    this.slide = callbackFunction;

    this.config.leftHandleValue.addSubscriber(this.slideFunction.bind(this));
    this.config.rightHandleValue.addSubscriber(this.slideFunction.bind(this));
  }

  private slideFunction() {
    <...>
    this.slide(leftHandleValue, rightHandleValue);
  }
}
```
```ts
callbackFunction(leftHandleValue: number, rightHandleValue: number) {
  <...>
}
```

<a name="sliderModel"></a>

## 4. SliderModel

`SliderModel` calculates the `leftHandleValue` and `rightHandleValue`.
It can calculate current value between `minValue` and `maxValue` or current `index` for `defaultValues`
if `hasDefaultValues.get() === true`.

```ts
class SliderModel {
  constructor(config: SliderConfig, state: SliderState) {
    <...>
    this.state.leftHandlePosition.addSubscriber(this.calculateLeftHandleValue.bind(this));
    this.state.rightHandlePosition.addSubscriber(this.calculateRightHandleValue.bind(this));
  }

  private calculateLeftHandleValue(position: number): number {
    <...>
    this.config.leftHandleValue.set(calculatedValue);
    <...>
  }

  private calculateRightHandleValue(position: number): number {
    <...>
    this.config.rightHandleValue.set(calculatedValue);
    <...>
  }
}
```
Example:
```ts
config.hasDefaultValues.set(true);
config.defaultValues.set(['first', 'second', 'third']);
state.leftHandlePosition.set(0.5);

calculateLeftHandleValue(state.leftHandlePosition.get()); // 1 - returned index of element with middle position
```
```ts
config.hasDefaultValues.set(false);
config.minValue.set(20);
config.maxValue.set(80);
state.leftHandlePosition.set(0.5);

calculateLeftHandlePosition(stet.leftHandlePosition.get()); // 50 - returned value between minValue and maxValue
```

## 5. View

<a name="sliderView"></a>

## 5.1 SliderView

`SliderView` creates all the subViews.
It also creates slider scale and is responsible for scale events, such as clicks.

```ts
class SliderView {
  constructor(root: HTMLElement, config: SliderConfig, state: SliderState) {
    // creating all the subviews
    <...>

    // making a scale
    this.ROOT = root;
    this.ROOT.classList.add(this.CLASSES.SLIDER);

    // adding events listeners for slider scale
    this.config.defaultValues.addSubscriber(this.checkDefaultValues.bind(this));
    this.config.isVertical.addSubscriber(this.switchVertical.bind(this));

    this.bindEventListeners();
  }

  private checkDefaultValues() {
    /*
    Function is responsible for adding and removing SliderDefaultValueViews
    if config.defaultValue is changed
    */
  }

  private switchVertical() {
    // adding/removing vertical class to the root
  }

  private bindEventListeners() {
    this.ROOT.addEventListener('click', this.clickHandler.bind(this));
  }

  private clickHandler(event: MouseEvent) {
    // responsible for slider scale clicks
  }
}
```

<a name="sliderHandleView"></a>

## 5.2 SliderHandleView

`SliderHandleView` is responsible for rendering a handle and reacting handle events.
`SliderView` always has two instances of `SliderHandleView` for left and right handle.
Right handle is not displayed and has `maxValue` or `(defaultValues.length - 1)` if `hasDefaultValue.get() === false`.

```ts
class SliderHandleView {
  constructor(container: HTMLElement, config: SliderConfig, state: SliderState, side: Side) {
    <...>
    this.config.leftHandleValue.addSubscriber(this.render.bind(this));
    this.config.rightHandleValue.addSubscriber(this.render.bind(this));

    this.bindEventListeners();
  }

  // Following part changes handle shift based on this.config.handleValue
  private render() {
    <...>
    shift = this.calculateShift();
    shift += calculateExtraShift();
    <...>
  }

  private calculateShift(): number {
    // calculates handle shift based on this.config.handleValue (0% - 100%)
  }

  private calculateExtraShift(): number {
    // calculates extra shift (%) when handles are close to each other, to avoid overlaying
  }

  // Following part changes this.state based on mouse events
  private bindEventListeners() {
    this.ROOT.addEventListener('mousedown', this.drag.bind(this));
    document.addEventListener('mouseup', this.drop.bind(this));
    document.addEventListener('mousemove', this.watchMouse.bind(this));
  }

  private watchMouse(event: MouseEvent) {
    <...>
    if (this.SIDE === Side.Left) this.state.leftHandlePosition.set(position);
    else this.state.rightHandlePosition.set(position);
  }
}
```
```ts
class SliderView {
  constructor(root: HTMLElement, config: SliderConfig, state: SliderState) {
    <...>
    this.LEFT_HANDLE = new SliderHandle(this.ROOT, this.config, this.state, Side.Left);
    this.RIGHT_HANDLE = new SliderHandle(this.ROOT, this.config, this.state, Side.Right);
    <...>
  }
}
```

<a name="sliderLimitView"></a>

## 5.3 SliderLimitView

`SliderLimitView` is responsible for rendering a limit label and reacting limit label events.
Will be displayed only if `limitsDisplayed.get() === true` and `hasDefaultValues === true`.

```ts
class SliderLimitView {
  constructor(container: HTMLElement, config: SliderConfig, state: SliderState, type: Type) {
    <...>
    this.bindEventListeners();
  }

  private bindEventListeners() {
    this.ROOT.addEventListener('click', this.clickHandler.bind(this));
  }

  private clickHandler() {
    // changing this.state.leftHandlePosition to 0 if it`s minValue, or to 1 if it`s maxValue
  }
}
```

<a name="sliderValueLabelView"></a>

## 5.4 SliderValueLabelView

`SliderValueLabelView` is responsible for rendering value label above a handle.
Will be displayed only if `valueLabelDisplayed.get() === true`.

```ts
class SliderValueLabelView {
  constructor(container: HTMLElement, config: SliderConfig, side: Side) {
    <...>
    this.config.valueLabelDisplayed.addSubscriber(this.switch.bind(this));
  }
}
```
```ts
class SliderHandleView {
  constructor(container: HTMLElement, config: SliderConfig, state: SliderState, side: Side) {
    <...>
    this.LABEL = new SliderValueLabelView(this.ROOT, this.config, this.SIDE);
    <...>
  }
}
```

<a name="sliderRangeLineView"></a>

## 5.5 SliderRangeLineView

`SliderRangeView` is responsible for rendering range line between handles.
Will be displayed only if `isRange.get() === true`.

```ts
class SliderRangeLine {
  constructor(container: HTMLElement, config: SliderConfig) {
    <...>
    this.config.leftHandleValue.addSubscriber(this.render.bind(this));
    this.config.rightHandleValue.addSubscriber(this.render.bind(this));
    this.config.isRange.addSubscriber(this.switch.bind(this));
  }
}
```

<a name="sliderDefaultValuesLabel"></a>

## 5.6 SliderDefaultValueLabel

`SliderDefaultValueLabel` is responsible only for one default value label.
Which means that for each value from `defaultValues` will be created an instance of this class.

```ts
class SliderDefaultValueLabelView {
  constructor(container: HTMLElement, config: SliderConfig, state: SliderState, index: number) {
    <...>
  }

  public remove() {
    // function is responsible for removing an instatnce of SliderDefaultValueLabelView
  }

  private bindEventListeners() {
    this.ROOT.addEventListener('click', this.clickHandler.bind(this));
  }

  private clickHandler() {
    <...>
    this.state.leftHandlePosition.set(position);
  }
}
```
```ts
class SliderView {
  constructor(root: HTMLElement, config: SliderConfig, state: SliderState) {
    <...>
    const defaultValues = this.config.defaultValues.get() as number[] | string[];
    
    defaultValues.forEach((value: string | number, index: number) => {
      this.DEFAULT_VALUES[index] = new SliderDefaultValueLabel(this.ROOT, this.config, this.state, index);
    });
    <...>

    this.config.defaultValues.addSubscriber(this.checkDefaultValues.bind(this));
  }

  private checkDefaultValues() {
    /*
    Function is responsible for adding and removing SliderDefaultValueViews
    if config.defaultValue is changed
    */
  }
}
```