import { expect } from "chai"
import { SliderStateItem } from "../../../src/slider/sliderState/sliderStateItem"

class Subscriber {
  public value: number

  constructor(value: number) {
    this.value = value
  }

  public update(value: number) {
    this.value = value
  }
}

describe("sliderStateItem", () => {
  it("should save given value", () => {
    let sliderStateItem = new SliderStateItem(2)
    expect(sliderStateItem.get()).to.equal(2)
  })

  describe("get", () => {
    it("should return the value", () => {
      let sliderStateItem = new SliderStateItem(2)
      expect(sliderStateItem.get()).to.equal(2)
    })
  })

  describe("set", () => {
    it("should save new value", () => {
      let sliderStateItem = new SliderStateItem(2)
      sliderStateItem.set(10)
      expect(sliderStateItem.get()).to.equal(10)
    })

    it("should check value with checkValue function", () => {
      let sliderStateItem = new SliderStateItem(20, (value: number) => {
        if (value > 50) value = 50
        return value
      })
      sliderStateItem.set(100)

      expect(sliderStateItem.get()).to.equal(50)
    })

    it("should transmit the value to the subscribers", () => {
      let sliderStateItem = new SliderStateItem(20)
      let subscriber = new Subscriber(100)

      sliderStateItem.addSubscriber(subscriber.update.bind(subscriber))

      sliderStateItem.set(50)
      expect(subscriber.value).to.equal(50)
    })
  })

  describe("addSubscriber", () => {
    it("should add new subscriber to the subscribers list", () => {
      let sliderStateItem = new SliderStateItem(20)
      let subscriber = new Subscriber(100)

      sliderStateItem.addSubscriber(subscriber.update.bind(subscriber))

      sliderStateItem.set(50)
      expect(subscriber.value).to.equal(50)
    })
  })

  describe("removeSubscriber", () => {
    it("should remove a subscriber from the subscribers list", () => {
      let sliderStateItem = new SliderStateItem(20)
      let subscriber = new Subscriber(100)
      let func = subscriber.update.bind(subscriber)
      sliderStateItem.addSubscriber(func)

      sliderStateItem.removeSubscriber(func)

      sliderStateItem.set(50)
      expect(subscriber.value).to.equal(100)
    })
  })
})