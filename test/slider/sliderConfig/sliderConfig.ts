import { expect } from "chai"
import { SliderConfig } from "../../../src/slider/sliderConfig/sliderConfig"
import slider from "../../../src/slider/slider"

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

describe("sliderConfig", () => {
  describe("constructor", () => {
    it("should set isRange value to the provided one", () => {
      let sliderConfig = new SliderConfig(defaultConfig)
      expect(sliderConfig.isRange.get()).to.equal(false)
    })

    it("should set hasDefaultValues value to the provided one", () => {
      let sliderConfig = new SliderConfig(defaultConfig)
      expect(sliderConfig.hasDefaultValues.get()).to.equal(false)
    })

    it("should set isVertical value to the provided one", () => {
      let sliderConfig = new SliderConfig(defaultConfig)
      expect(sliderConfig.isVertical.get()).to.equal(false)
    })

    it("should set valueLabelDisplayed value to the provided one", () => {
      let sliderConfig = new SliderConfig(defaultConfig)
      expect(sliderConfig.valueLabelDisplayed.get()).to.equal(true)
    })

    it("should set limitsDisplayed value to the provided one", () => {
      let sliderConfig = new SliderConfig(defaultConfig)
      expect(sliderConfig.limitsDisplayed.get()).to.equal(true)
    })

    it("should set minValue to the provided one", () => {
      let sliderConfig = new SliderConfig(defaultConfig)
      expect(sliderConfig.minValue.get()).to.equal(0)
    })

    it("should set maxValue to the provided one", () => {
      let sliderConfig = new SliderConfig(defaultConfig)
      expect(sliderConfig.maxValue.get()).to.equal(100)
    })

    it("should change maxValue to minValue if it`s lower then minValue", () => {
      let config = Object.assign({}, defaultConfig, {
        minValue: 30,
        maxValue: 10
      })
      let sliderConfig = new SliderConfig(config)
      expect(sliderConfig.maxValue.get()).to.equal(30)
    })

    it("should set step to the provided one", () => {
      let sliderConfig = new SliderConfig(defaultConfig)
      expect(sliderConfig.step.get()).to.equal(1)
    })

    it("should change step to 1 if it`s lower then 1", () => {
      let config = Object.assign({}, defaultConfig, {
        step: 0
      })
      let sliderConfig = new SliderConfig(config)
      expect(sliderConfig.step.get()).to.equal(1)
    })

    describe("default mode", () => {
      it("should set leftHandleValue to the provided one", () => {
        let sliderConfig = new SliderConfig(defaultConfig)
        expect(sliderConfig.leftHandleValue.get()).to.equal(0)
      })
  
      it("should change leftHandleValue to minValue if it`s less then minValue", () => {
        let config = Object.assign({}, defaultConfig, {
          minValue: 20,
          leftHandleValue: 0
        })
        let sliderConfig = new SliderConfig(config)
        expect(sliderConfig.leftHandleValue.get()).to.equal(20)
      })
  
      it("should change leftHandleValue to maxValue if it`s higher then maxValue", () => {
        let config = Object.assign({}, defaultConfig, {
          maxValue: 50,
          leftHandleValue: 80
        })
        let sliderConfig = new SliderConfig(config)
        expect(sliderConfig.leftHandleValue.get()).to.equal(50)
      })

      it("should set rightHandleValue to maxValue", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: false,
          maxValue: 50,
          rightHandleValue: 30
        })
        let sliderConfig = new SliderConfig(config)
        expect(sliderConfig.rightHandleValue.get()).to.equal(50)
      })
    })

    describe("defaultValues mode", () => {
      it("should change leftHandleValue to 0 if it`s lower then 0", () => {
        let config = Object.assign({}, defaultConfig, {
          hasDefaultValues: true,
          minValue: -50,
          leftHandleValue: -10
        })
        let sliderConfig = new SliderConfig(config)
        expect(sliderConfig.leftHandleValue.get()).to.equal(0)
      })

      it("should change leftHandleValue to (defaultValues.length - 1) if it`s higher then (defaultValues.length - 1)", () => {
        let config = Object.assign({}, defaultConfig, {
          hasDefaultValues: true,
          defaultValues: ["first", "second", "third"],
          leftHandleValue: 50
        })
        let sliderConfig = new SliderConfig(config)
        expect(sliderConfig.leftHandleValue.get()).to.equal(2)
      })

      it("should set rightHandleValue to (defaultValues.length - 1)", () => {
        let config = Object.assign({}, defaultConfig, {
          hasDefaultValues: true,
          isRange: false,
          defaultValues: ["first", "second", "third"],
          rightHandleValue: 1
        })
        let sliderConfig = new SliderConfig(config)
        expect(sliderConfig.rightHandleValue.get()).to.equal(2)
      })
    })

    describe("range mode", () => {
      it("should set rightHandleValue to the given one", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          rightHandleValue: 80
        })
        let sliderConfig = new SliderConfig(config)
        expect(sliderConfig.rightHandleValue.get()).to.equal(80)
      })

      it("should change rightHandleValue to leftHandleValue if it`s lower then leftHandleValue", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          leftHandleValue: 50,
          rightHandleValue: 20
        })
        let sliderConfig = new SliderConfig(config)
        expect(sliderConfig.rightHandleValue.get()).to.equal(50)
      })

      it("should change rightHandleValue to maxValue if it`s higher then maxValue", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          maxValue: 100,
          rightHandleValue: 120
        })
        let sliderConfig = new SliderConfig(config)
        expect(sliderConfig.rightHandleValue.get()).to.equal(100)
      })
    })

    describe("range mode with defaultValues", () => {
      it("should change rightHandleValue to (defaultValues.length - 1) if it`s higher then (defaultValues.length - 1)", () => {
        let config = Object.assign({}, defaultConfig, {
          hasDefaultValues: true,
          isRange: true,
          defaultValues: ["first", "second", "third"],
          rightHandleValue: 10
        })
        let sliderConfig = new SliderConfig(config)
        expect(sliderConfig.rightHandleValue.get()).to.equal(2)
      })
    })
  })

  describe("isRange.set()", () => {
    describe("given true", () => {
      describe("default mode", () => {
        it("should change rightHandleValue to leftHabdleValue if it`s less then leftHandleValue", () => {
          let config = Object.assign({}, defaultConfig, {
            isRange: false,
            maxValue: 100,
            rightHandleValue: 80
          })
          let sliderConfig = new SliderConfig(config)

          sliderConfig.rightHandleValue.set(80)
          sliderConfig.isRange.set(true)

          expect(sliderConfig.rightHandleValue.get()).to.equal(100)
        })

        it("should change rightHandleValue to maxValue if it`s higher then maxValue", () => {
          let config = Object.assign({}, defaultConfig, {
            isRange: false,
            maxValue: 100,
            rightHandleValue: 80
          })
          let sliderConfig = new SliderConfig(config)

          sliderConfig.rightHandleValue.set(200)
          sliderConfig.isRange.set(true)

          expect(sliderConfig.rightHandleValue.get()).to.equal(100)
        })
      })

      describe("defaultValues mode", () => {
        it("should change rightHandleValue to leftHabdleValue if it`s less then leftHandleValue", () => {
          let config = Object.assign({}, defaultConfig, {
            hasDefaultValues: true,
            isRange: false,
            defaultValues: ["first", "second", "third"],
            leftHandleValue: 1,
            rightHandleValue: 1
          })
          let sliderConfig = new SliderConfig(config)

          sliderConfig.leftHandleValue.set(2)
          sliderConfig.isRange.set(true)

          expect(sliderConfig.rightHandleValue.get()).to.equal(2)
        })

        it("should change rightHandleValue to (defaultValues.length - 1) if it`s higher then (defaultValues.length - 1)", () => {
          let config = Object.assign({}, defaultConfig, {
            hasDefaultValues: true,
            isRange: false,
            defaultValues: ["first", "second", "third"],
            leftHabdleValue: 0,
            rightHandleValue: 2
          })
          let sliderConfig = new SliderConfig(config)

          sliderConfig.isRange.set(true)

          expect(sliderConfig.rightHandleValue.get()).to.equal(2)
        })
      })
    })

    describe("given false", () => {
      describe("default mode", () => {
        it("should change rigthHandleValue to maxValue", () => {
          let config = Object.assign({}, defaultConfig, {
            isRange: true,
            maxValue: 100,
            rightHandleValue: 80
          })
          let sliderConfig = new SliderConfig(config)

          sliderConfig.isRange.set(false)

          expect(sliderConfig.rightHandleValue.get()).to.equal(100)
        })
      })

      /*describe("defaultValues mode", () => {
        it("should change rigthHandleValue to (defaultValues.length - 1)", () => {
          let config = Object.assign({}, defaultConfig, {
            isRange: true,
            hasDefaultValues: true,
            defaultValues: ["first", "second", "third"],
            maxValue: 1,
            rightHandleValue: 1
          })
          let sliderConfig = new SliderConfig(config)

          sliderConfig.isRange.set(false)

          expect(sliderConfig.rightHandleValue.get()).to.equal(2)
        })
      })*/
    })
  })

  describe("hasDefaultValues.set()", () => {
    describe("given true", () => {
      describe("default mode", () => {
        it("should change leftHandleValue to 0 if it`s less then 0", () => {
          let config = Object.assign({}, defaultConfig, {
            hasDefaultValues: false,
            defaultValues: ["first", "second", "third"],
            minValue: -10,
            leftHandleValue: -10,
            rightHandleValue: -5
          })
          let sliderConfig = new SliderConfig(config)

          sliderConfig.hasDefaultValues.set(true)

          expect(sliderConfig.leftHandleValue.get()).to.equal(0)
        })

        it("should change leftHandleValue to (defaultValues - 1) if it`s higher then (defaultValues - 1)", () => {
          let config = Object.assign({}, defaultConfig, {
            hasDefaultValues: false,
            defaultValues: ["first", "second", "third"],
            minValue: 20,
            leftHandleValue: 20
          })
          let sliderConfig = new SliderConfig(config)

          sliderConfig.hasDefaultValues.set(true)

          expect(sliderConfig.leftHandleValue.get()).to.equal(2)
        })
      })

      describe("range mode", () => {
        it("should change rightHandleValue to leftHandleValue if it`s lower then leftHandleValue", () => {
          let config = Object.assign({}, defaultConfig, {
            isRange: true,
            hasDefaultValues: false,
            defaultValues: ["first", "second", "third"],
            minValue: -20,
            leftHandleValue: -10,
            rightHandleValue: -5
          })
          let sliderConfig = new SliderConfig(config)

          sliderConfig.hasDefaultValues.set(true)

          expect(sliderConfig.rightHandleValue.get()).to.equal(0)
        })

        it("should change rightHandle to (defaultValues.length - 1) if it`s higher then (defaultValues - 1)", () => {
          let config = Object.assign({}, defaultConfig, {
            isRange: true,
            hasDefaultValues: false,
            defaultValues: ["first", "second", "third"],
            leftHandleValue: 0,
            rightHandleValue: 20
          })
          let sliderConfig = new SliderConfig(config)

          sliderConfig.hasDefaultValues.set(true)

          expect(sliderConfig.rightHandleValue.get()).to.equal(2)
        })
      })
    })

    describe("given false", () => {
      describe("defaultMode", () => {
        it("should change leftHandleValue to minValue if it`s lower then minValue", () => {
          let config = Object.assign({}, defaultConfig, {
            hasDefaultValues: true,
            defaultValues: ["first", "second", "third"],
            minValue: 20,
            leftHandleValue: 0
          })
          let sliderConfig = new SliderConfig(config)

          sliderConfig.hasDefaultValues.set(false)

          expect(sliderConfig.leftHandleValue.get()).to.equal(20)
        })

        it("should change leftHandleValue to maxValue if it`s higher then miaxValue", () => {
          let config = Object.assign({}, defaultConfig, {
            hasDefaultValues: true,
            defaultValues: ["first", "second", "third"],
            maxValue: 1,
            leftHandleValue: 2
          })
          let sliderConfig = new SliderConfig(config)

          sliderConfig.hasDefaultValues.set(false)

          expect(sliderConfig.leftHandleValue.get()).to.equal(1)
        })
      })

      describe("ranhe mode", () => {
        it("should change rightHandleValue to leftHandleValue if it`s lower then leftHandleValue", () => {
          let config = Object.assign({}, defaultConfig, {
            isRange: true,
            hasDefaultValues: true,
            defaultValues: ["first", "second", "third"],
            minValue: 20,
            leftHandleValue: 1,
            rightHandleValue: 2
          })
          let sliderConfig = new SliderConfig(config)

          sliderConfig.hasDefaultValues.set(false)

          expect(sliderConfig.rightHandleValue.get()).to.equal(20)
        })

        it("should change rightHandle to maxValue if it`s higher then maxValue", () => {
          let config = Object.assign({}, defaultConfig, {
            isRange: true,
            hasDefaultValues: true,
            defaultValues: ["first", "second", "third"],
            minValue: -20,
            maxValue: -10,
            leftHandleValue: 0,
            rightHandleValue: 2
          })
          let sliderConfig = new SliderConfig(config)

          sliderConfig.hasDefaultValues.set(false)

          expect(sliderConfig.rightHandleValue.get()).to.equal(-10)
        })
      })
    })
  })

  describe("minValue.set()", () => {
    describe("defaultMode", () => {
      it("should change it to maxValue is it`s higher then maxValue", () => {
        let config = Object.assign({}, defaultConfig, {
          minValue: 0,
          maxValue: 100
        })
        let sliderConfig = new SliderConfig(config)

        sliderConfig.minValue.set(200)

        expect(sliderConfig.minValue.get()).to.equal(100)
      })

      it("should change leftHandleValue to minValue if it`s lower then minValue", () => {
        let config = Object.assign({}, defaultConfig, {
          minValue: 0,
          leftHandleValue: 20
        })
        let sliderConfig = new SliderConfig(config)

        sliderConfig.minValue.set(30)

        expect(sliderConfig.leftHandleValue.get()).to.equal(30)
      })
    })

    describe("range mode", () => {
      it("should change rightHandleValue to minValue if it`s lower then minValue", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          minValue: 0,
          leftHandleValue: 0,
          rightHandleValue: 20
        })
        let sliderConfig = new SliderConfig(config)

        sliderConfig.minValue.set(30)

        expect(sliderConfig.rightHandleValue.get()).to.equal(30)
      })
    })
  })

  describe("maxValue.set()", () => {
    describe("default mode", () => {
      it ("should change maxValue to minValue if it`s lower then minValue", () => {
        let config = Object.assign({}, defaultConfig, {
          minValue: 50,
          maxValue: 100
        })
        let sliderConfig = new SliderConfig(config)

        sliderConfig.maxValue.set(30)

        expect(sliderConfig.maxValue.get()).to.equal(50)
      })

      it("should change leftHandleValue to maxValue if it`s higher then maxValue", () => {
        let config = Object.assign({}, defaultConfig, {
          maxValue: 100,
          leftHandleValue: 80
        })
        let sliderConfig = new SliderConfig(config)

        sliderConfig.maxValue.set(50)

        expect(sliderConfig.leftHandleValue.get()).to.equal(50)
      })
    })

    describe("range mode", () => {
      it("should change rightHandleValue to maxValue if it`s lower then maxValue", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          maxValue: 100,
          rightHandleValue: 80
        })
        let sliderConfig = new SliderConfig(config)

        sliderConfig.maxValue.set(50)

        expect(sliderConfig.rightHandleValue.get()).to.equal(50)
      })
    })
  })

  describe("step.set()", () => {
    it("should set step to the given value", () => {
      let config = Object.assign({}, defaultConfig, {
        step: 1
      })
      let sliderConfig = new SliderConfig(config)

      sliderConfig.step.set(10)

      expect(sliderConfig.step.get()).to.equal(10)
    })

    it("should change step to 1 if it`s lower then 1", () => {
      let config = Object.assign({}, defaultConfig, {
        step: 1
      })
      let sliderConfig = new SliderConfig(config)

      sliderConfig.step.set(0)

      expect(sliderConfig.step.get()).to.equal(1)
    })
  })

  describe("leftHandleValue.set()", () => {
    describe("default value", () => {
      it("should set leftHandleValue to the given value", () => {
        let config = Object.assign({}, defaultConfig, {
          minValue: 0,
          maxValue: 100,
          leftHandleValue: 40
        })
        let sliderConfig = new SliderConfig(config)
  
        sliderConfig.leftHandleValue.set(60)
  
        expect(sliderConfig.leftHandleValue.get()).to.equal(60)
      })

      it("should change leftHandleValue to minValue if it`s lower then minValue", () => {
        let config = Object.assign({}, defaultConfig, {
          minValue: 20,
          leftHandleValue: 40
        })
        let sliderConfig = new SliderConfig(config)
  
        sliderConfig.leftHandleValue.set(10)
  
        expect(sliderConfig.leftHandleValue.get()).to.equal(20)
      })

      it("should change leftHandleValue to maxValue if it`s higher then maxValue", () => {
        let config = Object.assign({}, defaultConfig, {
          maxValue: 100,
          leftHandleValue: 40
        })
        let sliderConfig = new SliderConfig(config)
  
        sliderConfig.leftHandleValue.set(120)
  
        expect(sliderConfig.leftHandleValue.get()).to.equal(100)
      })
    })

    describe("defaultValues mode", () => {
      it("should set leftHandleValue to the given value", () => {
        let config = Object.assign({}, defaultConfig, {
          hasDefaultValues: true,
          defaultValues: ["first", "second", "third"],
          leftHandleValue: 0
        })
        let sliderConfig = new SliderConfig(config)
  
        sliderConfig.leftHandleValue.set(1)
  
        expect(sliderConfig.leftHandleValue.get()).to.equal(1)
      })

      it("should change leftHandleValue to 0 if it`s lower then 0", () => {
        let config = Object.assign({}, defaultConfig, {
          hasDefaultValues: true,
          minValue: 10,
          defaultValues: ["first", "second", "third"],
          leftHandleValue: 1
        })
        let sliderConfig = new SliderConfig(config)
  
        sliderConfig.leftHandleValue.set(-1)
  
        expect(sliderConfig.leftHandleValue.get()).to.equal(0)
      })

      it("should change leftHandleValue to (defaultValues.length - 1) if it`s higher then (defaultValues.length - 1)", () => {
        let config = Object.assign({}, defaultConfig, {
          hasDefaultValues: true,
          maxValue: 1,
          defaultValues: ["first", "second", "third"],
          leftHandleValue: 1
        })
        let sliderConfig = new SliderConfig(config)
  
        sliderConfig.leftHandleValue.set(10)
  
        expect(sliderConfig.leftHandleValue.get()).to.equal(2)
      })
    })

    describe("range mode", () => {
      it("should set leftHandleValue to the given value", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          minValue: 0,
          maxValue: 100,
          leftHandleValue: 20
        })
        let sliderConfig = new SliderConfig(config)
  
        sliderConfig.leftHandleValue.set(80)
  
        expect(sliderConfig.leftHandleValue.get()).to.equal(80)
      })

      it("should change leftHandleValue to rightHandleValue if it`s higher then rightHandleValue", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          leftHandleValue: 40,
          rightHandleValue: 60
        })
        let sliderConfig = new SliderConfig(config)
  
        sliderConfig.leftHandleValue.set(80)
  
        expect(sliderConfig.leftHandleValue.get()).to.equal(60)
      })
    })
  })

  describe("rightHandleValue.set()", () => {
    describe("default mode", () => {
      it("should change rightHandleValue to maxValue", () => {
        let config = Object.assign({}, defaultConfig, {
          maxValue: 100,
          rightHandleValue: 50
        })
        let sliderConfig = new SliderConfig(config)
  
        sliderConfig.rightHandleValue.set(80)
  
        expect(sliderConfig.rightHandleValue.get()).to.equal(100)
      })
    })

    describe("range mode", () => {
      it("should set rightHandleValue to the given value", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          minValue: 0,
          maxValue: 100,
          leftHandleValue: 0,
          rightHandleValue: 50
        })
        let sliderConfig = new SliderConfig(config)
  
        sliderConfig.rightHandleValue.set(80)
  
        expect(sliderConfig.rightHandleValue.get()).to.equal(80)
      })

      it("should change rightHandleValue to leftHandleValue if it`s lower the leftHandleValue", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          leftHandleValue: 50,
          rightHandleValue: 80
        })
        let sliderConfig = new SliderConfig(config)
  
        sliderConfig.rightHandleValue.set(40)
  
        expect(sliderConfig.rightHandleValue.get()).to.equal(50)
      })

      it("should change rightHandleValue to maxValue if it`s higher the maxValue", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          maxValue: 100,
          rightHandleValue: 80
        })
        let sliderConfig = new SliderConfig(config)
  
        sliderConfig.rightHandleValue.set(120)
  
        expect(sliderConfig.rightHandleValue.get()).to.equal(100)
      })
    })

    describe("range mode with default values", () => {
      it("should set rightHandleValue to the given value", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          hasDefaultValues: true,
          defaultValues: ["first", "second", "third"],
          leftHandleValue: 0,
          rightHandleValue: 50
        })
        let sliderConfig = new SliderConfig(config)
  
        sliderConfig.rightHandleValue.set(1)
  
        expect(sliderConfig.rightHandleValue.get()).to.equal(1)
      })

      it("should change rightHandleValue to (defaultValues.length - 1) if its higher then (defaultValues.length - 1)", () => {
        let config = Object.assign({}, defaultConfig, {
          hasDefaultValues: true,
          isRange: true,
          defaultValues: ["first", "second", "third"],
          rightHandleValue: 1
        })
        let sliderConfig = new SliderConfig(config)
  
        sliderConfig.rightHandleValue.set(10)
  
        expect(sliderConfig.rightHandleValue.get()).to.equal(2)
      })

      it("should change rightHandleValue to leftHandleValue if it`s lower the leftHandleValue", () => {
        let config = Object.assign({}, defaultConfig, {
          isRange: true,
          hasDefaultValues: true,
          defaultValues: ["first", "second", "third"],
          leftHandleValue: 1,
          rightHandleValue: 2
        })
        let sliderConfig = new SliderConfig(config)
  
        sliderConfig.rightHandleValue.set(0)
  
        expect(sliderConfig.rightHandleValue.get()).to.equal(1)
      })
    })
  })

  describe("defaultValues.set()", () => {
    it("should change leftHandleValue to (defaultValues.length - 1) if it`s higher then (defaultValues.length - 1)", () => {
      let config = Object.assign({}, defaultConfig, {
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"],
        leftHandleValue: 2
      })
      let sliderConfig = new SliderConfig(config)

      sliderConfig.defaultValues.set(["fisrt", "second"])

      expect(sliderConfig.leftHandleValue.get()).to.equal(1)
    })

    it("should change rightHandleValue to (defaultValues.length - 1) if it`s higher then (defaultValues.length - 1)", () => {
      let config = Object.assign({}, defaultConfig, {
        isRange: true,
        hasDefaultValues: true,
        defaultValues: ["first", "second", "third"],
        rightHandleValue: 2
      })
      let sliderConfig = new SliderConfig(config)

      sliderConfig.defaultValues.set(["fisrt", "second"])

      expect(sliderConfig.rightHandleValue.get()).to.equal(1)
    })
  })
})