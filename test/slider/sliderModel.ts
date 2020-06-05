import { expect } from "chai"
import { SliderModel } from "../../src/slider/sliderModel"

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
  describe("defaultMode", () => {
    describe("config checking", () => {
      it("should change maxValue to minValue if it`s less then minValue", () => {
        let config = Object.assign({}, defaultConfig, {
          minValue: 40,
          maxValue: 20
        })
        let sliderModel = new SliderModel(config)

        expect(sliderModel.getConfig().maxValue).to.equal(40)
      })

      it("should change leftHandleValue to minValue if it`s lower then minValue", () => {
        let config = Object.assign({}, defaultConfig, {
          leftHandleValue: -20
        })
        let sliderModel = new SliderModel(config)

        expect(sliderModel.getConfig().leftHandleValue).to.equal(0)
      })

      it("should change leftHandleValue to maxValue if it`s higher then maxValue", () => {
        let config = Object.assign({}, defaultConfig, {
          leftHandleValue: 200
        })
        let sliderModel = new SliderModel(config)

        expect(sliderModel.getConfig().leftHandleValue).to.equal(100)
      })

      it("should change step to 1 if ot`s lower then 1", () => {
        let config = Object.assign({}, defaultConfig, {
          step: -4
        })
        let sliderModel = new SliderModel(config)

        expect(sliderModel.getConfig().step).to.equal(1)
      })

      it("should change rightHandleValue to maxValue", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: false,
          rightHandleValue: 80,
          maxValue: 100
        })
        let sliderModel = new SliderModel(config)

        expect(sliderModel.getConfig().rightHandleValue).to.equal(100)
      })
    })

    describe("calculateLeftHandleValue", () => {
      let sliderModel = new SliderModel({
        isRange: false,
        hasDefaultValues: false,
        isVertical: false,
        valueLabelDisplayed: true,
        limitsDisplayed: true,
        minValue: 0,
        maxValue: 100,
        step: 1,
        leftHandleValue: 50,
        rightHandleValue: 200,
        defaultValues: ["first", "second", "third"]
      })

      it("should return minValue if position is 0", () => {
        expect(sliderModel.calculateLeftHandleValue(0)).to.equal(0)
      })

      it("should return maxValue if position is 1", () => {
        expect(sliderModel.calculateLeftHandleValue(1)).to.equal(100)
      })

      it("should return 50 if given 0.5 and maxValue - minValue = 50", () => {
        expect(sliderModel.calculateLeftHandleValue(0.5)).to.equal(50)
      })

      it("should return minValue if position is less then 0", () => {
        expect(sliderModel.calculateLeftHandleValue(-2)).to.equal(0)
      })

      it("should return maxValue if position is more then 1", () => {
        expect(sliderModel.calculateLeftHandleValue(2)).to.equal(100)
      })
    })

    describe("calculateRightHandleValue", () => {
      let sliderModel = new SliderModel({
        isRange: false,
        hasDefaultValues: false,
        isVertical: false,
        valueLabelDisplayed: true,
        limitsDisplayed: true,
        minValue: 0,
        maxValue: 100,
        step: 1,
        leftHandleValue: 50,
        rightHandleValue: 60,
        defaultValues: ["first", "second", "third"]
      })

      it("should return maxValue no matter what", () => {
        expect(sliderModel.calculateRightHandleValue(0)).to.equal(100)
      })
    })

    describe("setLeftHandleValue", () => {
      it("should change leftHandleValue to minValue if it`s lower then minValue", () => {
        let sliderModel = new SliderModel({
          minValue: 20
        })

        sliderModel.setLeftHandleValue(10)

        expect(sliderModel.getLeftHandleValue()).to.equal(20)
      })

      it("should change leftHandleValue to maxValue if it`s higher then maxValue", () => {
        let sliderModel = new SliderModel({
          maxValue: 80
        })

        sliderModel.setLeftHandleValue(90)

        expect(sliderModel.getLeftHandleValue()).to.equal(80)
      })

      it("should change leftHandleValue to minValue if receiver value == NaN", () => {
        let sliderModel = new SliderModel({
          minValue: 20
        })

        sliderModel.setLeftHandleValue(NaN)

        expect(sliderModel.getLeftHandleValue()).to.equal(20)
      })
    })

    describe("setRightHandleValue", () => {
      it("should change rightHandleValue to maxValue no matter what", () => {
        let sliderModel = new SliderModel({
          maxValue: 80
        })

        sliderModel.setRightHandleValue(70)

        expect(sliderModel.getRightHandleValue()).to.equal(80)
      })
    })
  })

  describe("rangeMode", () => {
    describe("config checking", () => {
      it("should change rightHandleValue to leftHandleValue if it`s lower then leftHandleValue", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          leftHandleValue: 60,
          rightHandleValue: 40 
        })
        let sliderModel = new SliderModel(config)

        expect(sliderModel.getConfig().rightHandleValue).to.equal(60)
      })

      it("should change rightHandleValue to maxValue if it`s higher then maxValue", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          maxValue: 100,
          rightHandleValue: 200 
        })
        let sliderModel = new SliderModel(config)

        expect(sliderModel.getConfig().rightHandleValue).to.equal(100)
      })
    })

    describe("calculateLeftHandleValue", () => {
      let sliderModel = new SliderModel({
        isRange: true,
        hasDefaultValues: false,
        isVertical: false,
        valueLabelDisplayed: true,
        limitsDisplayed: true,
        minValue: 0,
        maxValue: 100,
        step: 1,
        leftHandleValue: 20,
        rightHandleValue: 80,
        defaultValues: ["first", "second", "third"]
      })

      it("should return rightHandleValue if calculated value is higher then rightHandleValue", () => {
        expect(sliderModel.calculateLeftHandleValue(0.9)).to.equal(80)
      })
    })

    describe("calculateRightHandleValue", () => {
      let sliderModel = new SliderModel({
        isRange: true,
        hasDefaultValues: false,
        isVertical: false,
        valueLabelDisplayed: true,
        limitsDisplayed: true,
        minValue: 0,
        maxValue: 100,
        step: 1,
        leftHandleValue: 20,
        rightHandleValue: 80,
        defaultValues: ["first", "second", "third"]
      })

      it("should return LeftHandleValue if calculated value is lower then LeftHandleValue", () => {
        expect(sliderModel.calculateRightHandleValue(0.1)).to.equal(20)
      })
    })

    describe("setLeftHandleValue", () => {
      it("should change leftHandleValue to rightHandleValue if it`s higher then rightHandleValue", () => {
        let sliderModel = new SliderModel({
          isRange: true,
          rightHandleValue: 50
        })

        sliderModel.setLeftHandleValue(60)

        expect(sliderModel.getLeftHandleValue()).to.equal(50)
      })
    })

    describe("setRightHandleValue", () => {
      it("should change rightHandleValue to maxValue if it`s higher then maxValue", () => {
        let sliderModel = new SliderModel({
          isRange: true,
          maxValue: 100,
          rightHandleValue: 80
        })

        sliderModel.setRightHandleValue(120)

        expect(sliderModel.getRightHandleValue()).to.equal(100)
      })

      it("should change rightHandleValue to leftHandleValue if it`s lower then leftHandleValue", () => {
        let sliderModel = new SliderModel({
          isRange: true,
          leftHandleValue: 60,
          rightHandleValue: 80
        })

        sliderModel.setRightHandleValue(40)

        expect(sliderModel.getRightHandleValue()).to.equal(60)
      })

      it("should change rightHandleValue to maxValue if received value is NaN", () => {
        let sliderModel = new SliderModel({
          isRange: true,
          maxValue: 100
        })

        sliderModel.setRightHandleValue(NaN)

        expect(sliderModel.getRightHandleValue()).to.equal(100)
      })
    })
  })

  describe("defaultValuesMode", () => {
    describe("config checking", () => {
      it("should change leftHandleValue to 0 if it`s lower then 0", () => {
        let config = Object.assign({}, defaultConfig, {
          hasDefaultValues: true,
          minValue: 10,
          leftHandleValue: -2
        })
        let sliderModel = new SliderModel(config)

        expect(sliderModel.getConfig().leftHandleValue).to.equal(0)
      })

      it("should change leftHandleValue to (defaultValues.length - 1) if it`s higher then defaultValues.length", () => {
        let config = Object.assign({}, defaultConfig, {
          hasDefaultValues: true,
          leftHandleValue: 100
        })
        let sliderModel = new SliderModel(config)

        expect(sliderModel.getConfig().leftHandleValue).to.equal(sliderModel.getConfig().defaultValues.length - 1)
      })

      it("should change rightHandleValue to (defaultValues.length - 1)", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: false,
          hasDefaultValues: true,
          rightHandleValue: 1
        })
        let sliderModel = new SliderModel(config)

        expect(sliderModel.getConfig().rightHandleValue).to.equal(sliderModel.getConfig().defaultValues.length - 1)
      })
    })

    describe("calculateLeftHandleValue", () => {
      let sliderModel = new SliderModel({
        isRange: false,
        hasDefaultValues: true,
        isVertical: false,
        valueLabelDisplayed: true,
        limitsDisplayed: true,
        minValue: 0,
        maxValue: 100,
        step: 1,
        leftHandleValue: 20,
        rightHandleValue: 80,
        defaultValues: ["first", "second", "third"]
      })

      it("should return 0 if position is less or equal 0", () => {
        expect(sliderModel.calculateLeftHandleValue(0)).to.equal(0)
        expect(sliderModel.calculateLeftHandleValue(-1)).to.equal(0)
      })

      it("should return (defaultValues.length - 1) if position is higher or equal 1", () => {
        expect(sliderModel.calculateLeftHandleValue(1)).to.equal(2)
        expect(sliderModel.calculateLeftHandleValue(2)).to.equal(2)
      })

      it("should return 1 if there are 3 elements and position is 0.4", () => {
        expect(sliderModel.calculateLeftHandleValue(0.4)).to.equal(1)
      })
    })

    describe("calculateRightHandleValue", () => {
      let sliderModel = new SliderModel({
        isRange: false,
        hasDefaultValues: true,
        isVertical: false,
        valueLabelDisplayed: true,
        limitsDisplayed: true,
        minValue: 0,
        maxValue: 100,
        step: 1,
        leftHandleValue: 20,
        rightHandleValue: 80,
        defaultValues: ["first", "second", "third"]
      })

      it("should return (defaultValues.length - 1) no matter what", () => {
        expect(sliderModel.calculateRightHandleValue(0)).to.equal(2)
      })
    })

    describe("setLeftHandleValue", () => {
      it("should change leftHandleValue to 0 if it`s lower then 0", () => {
        let sliderModel = new SliderModel({
          hasDefaultValues: true,
          minValue: -10
        })

        sliderModel.setLeftHandleValue(-1)

        expect(sliderModel.getLeftHandleValue()).to.equal(0)
      })

      it("should change leftHandleValue to (defaultValues.length - 1) if it`s higher then defaultValues.length - 1", () => {
        let sliderModel = new SliderModel({
          hasDefaultValues: true
        })

        sliderModel.setLeftHandleValue(100)

        expect(sliderModel.getLeftHandleValue()).to.equal(sliderModel.getConfig().defaultValues.length - 1)
      })

      it("should change leftHandleValue to 0 if receiver value is NaN", () => {
        let sliderModel = new SliderModel({
          hasDefaultValues: true
        })

        sliderModel.setLeftHandleValue(NaN)

        expect(sliderModel.getLeftHandleValue()).to.equal(0)
      })
    })

    describe("setRightHandleValue", () => {
      it("should change rightHandleValue to (defaultValues - 1) if it`s higher then (defaultValues -1)", () => {
        let sliderModel = new SliderModel({
          hasDefaultValues: true,
          rightHandleValue: 1
        })

        sliderModel.setRightHandleValue(100)

        expect(sliderModel.getRightHandleValue()).to.equal(sliderModel.getConfig().defaultValues.length - 1)
      })

      it("should change rightHandleValue to leftHandleValue if it`s lower then leftHandleValue", () => {
        let sliderModel = new SliderModel({
          hasDefaultValues: true,
          leftHandleValue: 1,
          rightHandleValue: 2
        })

        sliderModel.setRightHandleValue(0)

        expect(sliderModel.getRightHandleValue()).to.equal(1)
      })
    })
  })

  describe("rangeMode with defaultValues", () => {
    describe("config checking", () => {
      it("should change rightHandleValue to leftHandleValue if it`s lower then leftHandleValue", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          hasDefaultValues: true,
          leftHandleValue: 1,
          rightHandleValue: 0
        })
        let sliderModel = new SliderModel(config)

        expect(sliderModel.getConfig().rightHandleValue).to.equal(1)
      })

      it("should change rightHandleValue to (defaultValues.length - 1) if it`s higher then defaultValues.length - 1", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          hasDefaultValues: true,
          rightHandleValue: 100
        })
        let sliderModel = new SliderModel(config)

        expect(sliderModel.getConfig().rightHandleValue).to.equal(sliderModel.getConfig().defaultValues.length - 1)
      })
    })

    describe("calculateLeftHandleValue", () => {
      it("should return rightHandleValue if calculated value is higher then rightHandleValue", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          hasDefaultValues: true,
          leftHandleValue: 0,
          rightHandleValue: 1
        })
        let sliderModel = new SliderModel(config)

        expect(sliderModel.calculateLeftHandleValue(1)).to.equal(1)
      })
    })

    describe("calculateRightHandleValue", () => {
      it("should return leftHandleValue if calculated value is lower then leftHandleValue", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          hasDefaultValues: true,
          leftHandleValue: 1,
          rightHandleValue: 2
        })
        let sliderModel = new SliderModel(config)

        expect(sliderModel.calculateRightHandleValue(0)).to.equal(1)
      })

      it("should return (defaultValues.length - 1) if position is higher then 1", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          hasDefaultValues: true
        })
        let sliderModel = new SliderModel(config)

        expect(sliderModel.calculateRightHandleValue(2)).to.equal(sliderModel.getConfig().defaultValues.length - 1)
      })
    })

    describe("setLeftHandleValue", () => {
      it("should change leftHandleValue to rightHandleValue if it`s higher then rightHandleValue", () => {
        let sliderModel = new SliderModel({
          isRange: true,
          hasDefaultValues: true,
          rightHandleValue: 1
        })
  
        sliderModel.setLeftHandleValue(60)
  
        expect(sliderModel.getLeftHandleValue()).to.equal(1)
      })
    })

    describe("setRightHandleValue", () => {
      it("should change rightHandleValue to (defaultValues.length - 1) if received value is NaN", () => {
        let sliderModel = new SliderModel({
          isRange: true,
          hasDefaultValues: true
        })

        sliderModel.setRightHandleValue(NaN)

        expect(sliderModel.getRightHandleValue()).to.equal(sliderModel.getConfig().defaultValues.length - 1)
      })
    })
  })
})