/// <reference path='../../../src/slider/slider.d.ts' />
import { expect } from 'chai';
import { Model } from '../../../src/slider/model/Model';

const defaultConfig = {
  isRange: true,
  isVertical: false,
  scaleDisplayed: true,
  valueLabelDisplayed: true,
  minValue: 0,
  maxValue: 100,
  step: 1,
  pointsNumber: 5,
  leftHandleValue: 20,
  rightHandleValue: 80,
};

class Subscriber<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  public set(value: T) {
    this.value = value;
  }

  public get(): T {
    return this.value;
  }
}

describe('model', () => {
  describe('constructor', () => {
    it('should be set with a given config', () => {
      const model = new Model(defaultConfig);

      expect(model.isRange.get()).to.equal(true);
      expect(model.isVertical.get()).to.equal(false);
      expect(model.scaleDisplayed.get()).to.equal(true);
      expect(model.valueLabelDisplayed.get()).to.equal(true);
      expect(model.minValue.get()).to.equal(0);
      expect(model.maxValue.get()).to.equal(100);
      expect(model.step.get()).to.equal(1);
      expect(model.pointsNumber.get()).to.equal(5);
      expect(model.leftHandleValue.get()).to.equal(20);
      expect(model.rightHandleValue.get()).to.equal(80);
    });
  });

  describe('getCurrentState', () => {
    it('should return current state', () => {
      const model = new Model(defaultConfig);
      const currentState = model.getCurrentState();

      expect(currentState.isRange).to.equal(true);
      expect(currentState.isVertical).to.equal(false);
      expect(currentState.scaleDisplayed).to.equal(true);
      expect(currentState.valueLabelDisplayed).to.equal(true);
      expect(currentState.minValue).to.equal(0);
      expect(currentState.maxValue).to.equal(100);
      expect(currentState.step).to.equal(1);
      expect(currentState.pointsNumber).to.equal(5);
      expect(currentState.leftHandleValue).to.equal(20);
      expect(currentState.rightHandleValue).to.equal(80);
    });
  });

  describe('isRange', () => {
    it('should set and return value', () => {
      const model = new Model({ isRange: false });
      model.isRange.set(true);
      expect(model.isRange.get()).to.equal(true);
    });

    it('should call subscribers', () => {
      const model = new Model({ isRange: false });
      const subscriber = new Subscriber(false);
      model.isRange.addSubscriber(subscriber.set.bind(subscriber));
      model.isRange.set(true);
      expect(subscriber.get()).to.equal(true);
    });
  });

  describe('isVertical', () => {
    it('should set and return value', () => {
      const model = new Model({ isVertical: false });
      model.isVertical.set(true);
      expect(model.isVertical.get()).to.equal(true);
    });

    it('should call subscribers', () => {
      const model = new Model({ isVertical: false });
      const subscriber = new Subscriber(false);
      model.isVertical.addSubscriber(subscriber.set.bind(subscriber));
      model.isVertical.set(true);
      expect(subscriber.get()).to.equal(true);
    });
  });

  describe('scaleDisplayed', () => {
    it('should set and return value', () => {
      const model = new Model({ scaleDisplayed: false });
      model.scaleDisplayed.set(true);
      expect(model.scaleDisplayed.get()).to.equal(true);
    });

    it('should call subscribers', () => {
      const model = new Model({ scaleDisplayed: false });
      const subscriber = new Subscriber(false);
      model.scaleDisplayed.addSubscriber(subscriber.set.bind(subscriber));
      model.scaleDisplayed.set(true);
      expect(subscriber.get()).to.equal(true);
    });
  });

  describe('valueLabelDisplayed', () => {
    it('should set and return value', () => {
      const model = new Model({ valueLabelDisplayed: false });
      model.valueLabelDisplayed.set(true);
      expect(model.valueLabelDisplayed.get()).to.equal(true);
    });

    it('should call subscribers', () => {
      const model = new Model({ valueLabelDisplayed: false });
      const subscriber = new Subscriber(false);
      model.valueLabelDisplayed.addSubscriber(subscriber.set.bind(subscriber));
      model.valueLabelDisplayed.set(true);
      expect(subscriber.get()).to.equal(true);
    });
  });

  describe('minValue', () => {
    it('should set and return value', () => {
      const model = new Model({ minValue: 0 });
      model.minValue.set(10);
      expect(model.minValue.get()).to.equal(10);
    });

    it('should call subscribers', () => {
      const model = new Model({ minValue: 0 });
      const subscriber = new Subscriber(0);
      model.minValue.addSubscriber(subscriber.set.bind(subscriber));
      model.minValue.set(10);
      expect(subscriber.get()).to.equal(10);
    });

    it('should check value', () => {
      const model = new Model({ minValue: 0, maxValue: 50 });
      model.minValue.set(80);
      expect(model.minValue.get()).to.equal(50);
    });
  });

  describe('maxValue', () => {
    it('should set and return value', () => {
      const model = new Model({ maxValue: 100 });
      model.maxValue.set(90);
      expect(model.maxValue.get()).to.equal(90);
    });

    it('should call subscribers', () => {
      const model = new Model({ maxValue: 100 });
      const subscriber = new Subscriber(100);
      model.maxValue.addSubscriber(subscriber.set.bind(subscriber));
      model.maxValue.set(90);
      expect(subscriber.get()).to.equal(90);
    });

    it('should check value', () => {
      const model = new Model({ minValue: 50, maxValue: 100 });
      model.maxValue.set(40);
      expect(model.maxValue.get()).to.equal(50);
    });
  });

  describe('step', () => {
    it('should set and return value', () => {
      const model = new Model({ step: 1 });
      model.step.set(2);
      expect(model.step.get()).to.equal(2);
    });

    it('should call subscribers', () => {
      const model = new Model({ step: 1 });
      const subscriber = new Subscriber(1);
      model.step.addSubscriber(subscriber.set.bind(subscriber));
      model.step.set(2);
      expect(subscriber.get()).to.equal(2);
    });

    it('should check value', () => {
      const model = new Model({ step: 5 });
      model.step.set(-1);
      expect(model.step.get()).to.equal(1);
    });
  });

  describe('pointsNumber', () => {
    it('should set and return value', () => {
      const model = new Model({ pointsNumber: 2 });
      model.pointsNumber.set(3);
      expect(model.pointsNumber.get()).to.equal(3);
    });

    it('should call subscribers', () => {
      const model = new Model({ pointsNumber: 2 });
      const subscriber = new Subscriber(2);
      model.pointsNumber.addSubscriber(subscriber.set.bind(subscriber));
      model.pointsNumber.set(3);
      expect(subscriber.get()).to.equal(3);
    });

    it('should check value', () => {
      const model = new Model({ pointsNumber: 5 });
      model.pointsNumber.set(-1);
      expect(model.pointsNumber.get()).to.equal(2);
    });
  });

  describe('leftHandleValue', () => {
    it('should set and return value', () => {
      const model = new Model({ leftHandleValue: 10 });
      model.leftHandleValue.set(20);
      expect(model.leftHandleValue.get()).to.equal(20);
    });

    it('should call subscribers', () => {
      const model = new Model({ leftHandleValue: 10 });
      const subscriber = new Subscriber(10);
      model.leftHandleValue.addSubscriber(subscriber.set.bind(subscriber));
      model.leftHandleValue.set(20);
      expect(subscriber.get()).to.equal(20);
    });

    it('should check value', () => {
      const model = new Model({ leftHandleValue: 10, minValue: 0, maxValue: 100 });
      model.leftHandleValue.set(-10);
      expect(model.leftHandleValue.get()).to.equal(0);
      model.leftHandleValue.set(120);
      expect(model.leftHandleValue.get()).to.equal(100);
    });
  });

  describe('rightHandleValue', () => {
    it('should set and return value', () => {
      const model = new Model({ isRange: true, rightHandleValue: 90 });
      model.rightHandleValue.set(80);
      expect(model.rightHandleValue.get()).to.equal(80);
    });

    it('should call subscribers', () => {
      const model = new Model({ isRange: true, rightHandleValue: 90 });
      const subscriber = new Subscriber(90);
      model.rightHandleValue.addSubscriber(subscriber.set.bind(subscriber));
      model.rightHandleValue.set(80);
      expect(subscriber.get()).to.equal(80);
    });

    it('should check value', () => {
      const model = new Model({
        isRange: true,
        leftHandleValue: 50,
        rightHandleValue: 90,
        minValue: 0,
        maxValue: 100,
      });
      model.rightHandleValue.set(0);
      expect(model.rightHandleValue.get()).to.equal(50);
      model.rightHandleValue.set(120);
      expect(model.rightHandleValue.get()).to.equal(100);
    });
  });
});
