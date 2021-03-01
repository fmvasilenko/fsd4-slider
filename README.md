# FSD4 Slider

This is a jQuery slider plugin.  
[Demo page](https://fmvasilenko.github.io/fsd4-slider/)  
  
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
3. [subscribe](#subscribe)
4. [unsubscribe](#unsubscribe)
5. [setSliderOption](#setslideroption)
6. [getSliderOption](#getslideroption)
7. [UML Diagram](https://drive.google.com/file/d/1wYxhYIeVi5hJ0HeJ9hWspLYtM8TY3cw2/view?usp=sharing)


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
  isRange: false,
  isVertical: false,
  valueLabelDisplayed: true,
  scaleDisplayed: true,
  min: 0,
  max: 100,
  step: 1,
  firstValue: 20,
  secondValue: 80,
}
```

<a name="#subscribe"></a>

## 3. Subscribe

To subscribe on slider parameter use:
```ts
interface Slider {
  subscribe(option: ModelOption, subscriber: (value: number | boolean) => void)
}
```

Example:
```ts
const slider = $(element).slider();
const subscriber = (value) => console.log(value);

slider.subscribe('firstValue', subscriber);
```

<a name="#unsubscribe"></a>

## 4. Unsubscribe

To unsubscribe use:
```ts
interface Slider {
  unsubscribe(option: ModelOption, subscriber: (value: number | boolean) => void)
}
```

Example:
```ts
const slider = $(element).slider();
const subscriber = (value) => console.log(value);

slider.subscribe('firstValue', subscriber);
slider.unsubscribe('firstValue', subscriber);
```

<a name="#setslideroption"></a>

## 5. setSliderOption

Sets slider option. Has value and type check.
```ts
interface Slider {
  setSliderOption(option: ModelOption, value: State[ModelOption]): State[ModelOption]
}
```

Example:
```ts
const slider = $(element).slider();

slider.setSlideroption('firstValue', 20);
```

<a name="#getslideroption"></a>

## 6. getSliderOption

Returns slider option value
```ts
interface Slider {
  getSliderOption(option: ModelOption): State[ModelOption]
}
```

Example:
```ts
const slider = $(element).slider();

console.log(slider.getSlideroption('firstValue'));
```
