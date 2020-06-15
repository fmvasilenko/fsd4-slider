import { expect } from "chai"
import { SliderConfig } from "../../src/slider/sliderConfig/sliderConfig"
import { SliderModel } from "../../src/slider/sliderModel"
import { SliderState } from "../../src/slider/sliderState/sliderState"

let defaultConfig = {
  isRange: false,
  hasDefaultValues: false,
  isVertical: false,
  valueLabelDisplayed: true,
  limitsDisplayed: true,
  minValue: 0,
  maxValue: 100,
  step: 1,
  leftHandleValue: 0,
  rightHandleValue: 100,
  defaultValues: ["first", "second", "third"]
}

describe("sliderModel", () => {
  describe("calculateLeftHandleValue", () => {
    describe("default mode", () => {
      it("should set leftHandleValue to (maxValue - minValue)/2 if position is 0.5", () => {
        let config = new SliderConfig({
          minValue: 0,
          maxValue: 100,
          leftHandleValue: 0
        })
        let state = new SliderState()
        let sliderModel = new SliderModel(config, state)

        state.leftHandlePosition.set(0.5)

        expect(config.leftHandleValue.get()).to.equal(50)
      })
    })

    describe("defaultValues mode", () => {
      it("should set leftHandleValue to 1 if position is 0.5", () => {
        let config = new SliderConfig({
          hasDefaultValues: true,
          defaultValues: ["first", "second", "third"],
          leftHandleValue: 0
        })
        let state = new SliderState()
        let sliderModel = new SliderModel(config, state)

        state.leftHandlePosition.set(0.5)

        expect(config.leftHandleValue.get()).to.equal(1)
      })
    })
  })

  describe("calculaterightHandleValue", () => {
    describe("default mode", () => {
      it("should set rightHandleValue to (maxValue - minValue)/2 if position is 0.5", () => {
        let config = new SliderConfig({
          isRange: true,
          minValue: 0,
          maxValue: 100,
          leftHandleValue: 0
        })
        let state = new SliderState()
        let sliderModel = new SliderModel(config, state)

        state.rightHandlePosition.set(0.5)

        expect(config.rightHandleValue.get()).to.equal(50)
      })
    })

    describe("defaultValues mode", () => {
      it("should set rightHandleValue to 1 if position is 0.5", () => {
        let config = new SliderConfig({
          isRange: true,
          hasDefaultValues: true,
          defaultValues: ["first", "second", "third"],
          leftHandleValue: 0
        })
        let state = new SliderState()
        let sliderModel = new SliderModel(config, state)

        state.rightHandlePosition.set(0.5)

        expect(config.rightHandleValue.get()).to.equal(1)
      })
    })
  })
})