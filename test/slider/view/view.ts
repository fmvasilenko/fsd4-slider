/* eslint-disable no-new */
import { expect } from 'chai';
import { View } from '../../../src/slider/view/View';
import classes from '../../../src/slider/slider.classes';
import { defaultConfig } from '../../utils/sliderDefaultConfig';

describe('view', () => {
  describe('constructor', () => {
    it('should create root element for slider', () => {
      const container = document.createElement('div');
      new View(container);

      expect(container.querySelectorAll(`.${classes.root}`).length).to.equal(1);
    });
  });

  describe('updateIsRange', () => {
    it('should add the second handle', () => {
      const container = document.createElement('div');
      const view = new View(container);

      view.updateIsRange({ ...defaultConfig, isRange: true });
      expect(container.querySelectorAll(`.${classes.secondHandle}`).length).to.equal(1);
      expect(container.querySelector(`.${classes.rangeLine}`)?.clientLeft).to.equal(0);
    });
  });

  describe('updateIsVertical', () => {
    it('should add vertical classes', () => {
      const container = document.createElement('div');
      const view = new View(container);

      view.updateIsVertical({ ...defaultConfig, isVertical: true });
      expect(container.querySelectorAll(`.${classes.rootVertical}`).length).to.equal(1);
      expect(container.querySelectorAll(`.${classes.handleVertical}`).length).to.equal(1);
      expect(container.querySelectorAll(`.${classes.rangeLineVertical}`).length).to.equal(1);
    });
  });

  describe('updateValueLabelDisplayed', () => {
    it('should show/hide value label', () => {
      const container = document.createElement('div');
      const view = new View(container);

      view.updateValueLabelDisplayed({ ...defaultConfig, valueLabelDisplayed: false });
      expect(container.querySelectorAll(`.${classes.valueLabel}`).length).to.equal(0);
    });
  });

  describe('updateScaleDisplayed', () => {
    it('should show/hide scale', () => {
      const container = document.createElement('div');
      const view = new View(container);

      view.updateScaleDisplayed({ ...defaultConfig, scaleDisplayed: false });
      expect(container.querySelectorAll(`.${classes.scaleValue}`).length).to.equal(0);
    });
  });

  describe('updateScale', () => {
    it('should recalculate scale values number', () => {
      const container = document.createElement('div');
      const view = new View(container);

      view.updateScale(defaultConfig);
      expect(container.querySelectorAll(`.${classes.scaleValue}`).length).to.equal(7);
    });
  });

  describe('updateValues', () => {
    it('should call subscribers', () => {
      const container = document.createElement('div');
      const view = new View(container);

      view.updateIsRange({ ...defaultConfig, isRange: true });

      view.updateValues({ ...defaultConfig, firstValue: 30, secondValue: 70 });
      const handle = container.querySelectorAll(`.${classes.handle}`);
      expect((handle[0] as HTMLElement).style.left).to.equal('30%');
      expect((handle[1] as HTMLElement).style.left).to.equal('70%');
    });
  });

  describe('subscribe', () => {
    it('should add scale click subscriber', () => {
      const container = document.createElement('div');
      const view = new View(container);
      const subscriber = () => {};

      view.subscribe('scale', subscriber);
      // @ts-ignore
      expect(view.scaleSubscribers.subscribers.includes(subscriber)).to.equal(true);
    });

    it('should add first handle subscriber', () => {
      const container = document.createElement('div');
      const view = new View(container);
      const subscriber = () => {};

      view.subscribe('firstHandle', subscriber);
      // @ts-ignore
      expect(view.firstHandle.subscribers.subscribers.includes(subscriber)).to.equal(true);
    });

    it('should add second handle subscriber', () => {
      const container = document.createElement('div');
      const view = new View(container);
      const subscriber = () => {};

      view.subscribe('secondHandle', subscriber);
      // @ts-ignore
      expect(view.secondHandle.subscribers.subscribers.includes(subscriber)).to.equal(true);
    });
  });
});
