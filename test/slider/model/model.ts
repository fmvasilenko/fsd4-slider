/// <reference path='../../../src/slider/slider.d.ts' />
import { expect } from 'chai';
import { Model } from '../../../src/slider/model/Model';
import { defaultConfig } from '../../utils/sliderDefaultConfig';
import { Subscriber } from '../../utils/Subscriber';

describe('model', () => {
  describe('constructor', () => {
    it('should be set with a given config', () => {
      const model = new Model(defaultConfig);

      expect(model.isRange.get()).to.equal(true);
      expect(model.isVertical.get()).to.equal(false);
      expect(model.scaleDisplayed.get()).to.equal(true);
      expect(model.valueLabelDisplayed.get()).to.equal(true);
      expect(model.min.get()).to.equal(0);
      expect(model.max.get()).to.equal(100);
      expect(model.step.get()).to.equal(1);
      expect(model.firstValue.get()).to.equal(20);
      expect(model.secondValue.get()).to.equal(80);
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
      expect(currentState.min).to.equal(0);
      expect(currentState.max).to.equal(100);
      expect(currentState.step).to.equal(1);
      expect(currentState.firstValue).to.equal(20);
      expect(currentState.secondValue).to.equal(80);
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
      model.isRange.addSubscriber((state: State) => {
        subscriber.set(state.isRange);
      });
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
      model.isVertical.addSubscriber((state: State) => {
        subscriber.set(state.isVertical);
      });
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
      model.scaleDisplayed.addSubscriber((state: State) => {
        subscriber.set(state.scaleDisplayed);
      });
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
      model.valueLabelDisplayed.addSubscriber((state: State) => {
        subscriber.set(state.valueLabelDisplayed);
      });
      model.valueLabelDisplayed.set(true);
      expect(subscriber.get()).to.equal(true);
    });
  });

  describe('min', () => {
    it('should set and return value', () => {
      const model = new Model({ min: 0 });
      model.min.set(10);
      expect(model.min.get()).to.equal(10);
    });

    it('should call subscribers', () => {
      const model = new Model({ min: 0 });
      const subscriber = new Subscriber(0);
      model.min.addSubscriber((state: State) => {
        subscriber.set(state.min);
      });
      model.min.set(10);
      expect(subscriber.get()).to.equal(10);
    });

    it('should check value', () => {
      const model = new Model({ min: 0, max: 50, step: 1 });
      model.min.set(80);
      expect(model.min.get()).to.equal(49);
    });
  });

  describe('max', () => {
    it('should set and return value', () => {
      const model = new Model({ max: 100 });
      model.max.set(90);
      expect(model.max.get()).to.equal(90);
    });

    it('should call subscribers', () => {
      const model = new Model({ max: 100 });
      const subscriber = new Subscriber(100);
      model.max.addSubscriber((state: State) => {
        subscriber.set(state.max);
      });
      model.max.set(90);
      expect(subscriber.get()).to.equal(90);
    });

    it('should check value', () => {
      const model = new Model({ min: 50, max: 100, step: 1 });
      model.max.set(40);
      expect(model.max.get()).to.equal(51);
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
      model.step.addSubscriber((state: State) => {
        subscriber.set(state.step);
      });
      model.step.set(2);
      expect(subscriber.get()).to.equal(2);
    });

    it('should check value', () => {
      const model = new Model({ step: 5 });
      model.step.set(-1);
      expect(model.step.get()).to.equal(1);
    });
  });

  describe('firstValue', () => {
    it('should set and return value', () => {
      const model = new Model({ firstValue: 10 });
      model.firstValue.set(20);
      expect(model.firstValue.get()).to.equal(20);
    });

    it('should call subscribers', () => {
      const model = new Model({ firstValue: 10 });
      const subscriber = new Subscriber(10);
      model.firstValue.addSubscriber((state: State) => {
        subscriber.set(state.firstValue);
      });
      model.firstValue.set(20);
      expect(subscriber.get()).to.equal(20);
    });

    it('should check value', () => {
      const model = new Model({ firstValue: 10, min: 0, max: 100 });
      model.firstValue.set(-10);
      expect(model.firstValue.get()).to.equal(0);
      model.firstValue.set(120);
      expect(model.firstValue.get()).to.equal(100);
    });
  });

  describe('secondValue', () => {
    it('should set and return value', () => {
      const model = new Model({ isRange: true, secondValue: 90 });
      model.secondValue.set(80);
      expect(model.secondValue.get()).to.equal(80);
    });

    it('should call subscribers', () => {
      const model = new Model({ isRange: true, secondValue: 90 });
      const subscriber = new Subscriber(90);
      model.secondValue.addSubscriber((state: State) => {
        subscriber.set(state.secondValue);
      });
      model.secondValue.set(80);
      expect(subscriber.get()).to.equal(80);
    });

    it('should check value', () => {
      const model = new Model({
        isRange: true,
        firstValue: 50,
        secondValue: 90,
        min: 0,
        max: 100,
      });
      model.secondValue.set(0);
      expect(model.secondValue.get()).to.equal(50);
      model.secondValue.set(120);
      expect(model.secondValue.get()).to.equal(100);
    });
  });
});
