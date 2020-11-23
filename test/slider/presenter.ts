/* eslint-disable no-new */
/* eslint-disable class-methods-use-this */
import { expect } from 'chai';
import { Presenter } from '../../src/slider/presenter/Presenter';

const defaultConfig = {
  isRange: true,
  isVertical: false,
  scaleDisplayed: true,
  valueLabelDisplayed: true,
  minValue: 0,
  maxValue: 100,
  step: 1,
  leftHandleValue: 20,
  rightHandleValue: 80,
};

describe('presenter', () => {
  describe('isRange', () => {
    it('should set and return value', () => {
      const container = document.createElement('div');
      const presenter = new Presenter(container, defaultConfig);

      presenter.isRange = true;
      expect(presenter.isRange).to.equal(true);
    });
  });

  describe('isVertical', () => {
    it('should set and return value', () => {
      const container = document.createElement('div');
      const presenter = new Presenter(container, defaultConfig);

      presenter.isVertical = true;
      expect(presenter.isVertical).to.equal(true);
    });
  });

  describe('valueLabelDisplayed', () => {
    it('should set and return value', () => {
      const container = document.createElement('div');
      const presenter = new Presenter(container, defaultConfig);

      presenter.valueLabelDisplayed = true;
      expect(presenter.valueLabelDisplayed).to.equal(true);
    });
  });

  describe('scaleDisplayed', () => {
    it('should set and return value', () => {
      const container = document.createElement('div');
      const presenter = new Presenter(container, defaultConfig);

      presenter.scaleDisplayed = true;
      expect(presenter.scaleDisplayed).to.equal(true);
    });
  });

  describe('minValue', () => {
    it('should set and return value', () => {
      const container = document.createElement('div');
      const presenter = new Presenter(container, defaultConfig);

      presenter.minValue = 10;
      expect(presenter.minValue).to.equal(10);
    });
  });

  describe('maxValue', () => {
    it('should set and return value', () => {
      const container = document.createElement('div');
      const presenter = new Presenter(container, defaultConfig);

      presenter.maxValue = 120;
      expect(presenter.maxValue).to.equal(120);
    });
  });

  describe('step', () => {
    it('should set and return value', () => {
      const container = document.createElement('div');
      const presenter = new Presenter(container, defaultConfig);

      presenter.step = 5;
      expect(presenter.step).to.equal(5);
    });
  });

  describe('leftHandleValue', () => {
    it('should set and return value', () => {
      const container = document.createElement('div');
      const presenter = new Presenter(container, defaultConfig);

      presenter.leftHandleValue = 10;
      expect(presenter.leftHandleValue).to.equal(10);
    });
  });

  describe('rightHandleValue', () => {
    it('should set and return value', () => {
      const container = document.createElement('div');
      const presenter = new Presenter(container, defaultConfig);

      presenter.rightHandleValue = 90;
      expect(presenter.rightHandleValue).to.equal(90);
    });
  });
});
