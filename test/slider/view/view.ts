/* eslint-disable no-new */
/* eslint-disable class-methods-use-this */
import { expect } from 'chai';
import { HandleType, HandleView } from '../../../src/slider/view/HandleView';
import { RangeLineView } from '../../../src/slider/view/RangeLineView';
import { ScaleValueView } from '../../../src/slider/view/ScaleValueView';
import { View } from '../../../src/slider/view/View';
import classes from '../../../src/slider/slider.classes';
import { defaultConfig } from '../../utils/sliderDefaultConfig';

const sinon = require('sinon');

class FakeView {
  public firstHandle: HandleView;

  public secondHandle: HandleView;

  public rangeLine: RangeLineView;

  public scaleValues: ScaleValueView[] = [];

  constructor(container: HTMLElement) {
    this.firstHandle = new HandleView(container, HandleType.First);
    this.secondHandle = new HandleView(container, HandleType.Second);
    this.rangeLine = new RangeLineView(container);

    this.scaleValues.push(new ScaleValueView(container, defaultConfig, 2, 5));
  }

  public switchVertical() {}
}

describe('view', () => {
  describe('constructor', () => {
    it('should create root element for slider', () => {
      const container = document.createElement('div');
      new View(container);

      expect(container.querySelectorAll(`.${classes.root}`).length).to.equal(1);
    });
  });

  describe('updateIsRange', () => {
    it('should call subscribers', () => {
      const container = document.createElement('div');
      const view = new View(container);
      const fakeView = new FakeView(container);
      const secondHandleSpy = sinon.spy(fakeView.secondHandle, 'switchHandle');
      const rangeLineSpy = sinon.spy(fakeView.rangeLine, 'render');

      (view.updateIsRange.bind(fakeView))(defaultConfig);
      expect(secondHandleSpy.calledOnce).to.equal(true);
      expect(rangeLineSpy.calledOnce).to.equal(true);
    });
  });

  describe('updateIsVertical', () => {
    it('should call subscribers', () => {
      const container = document.createElement('div');
      const view = new View(container);
      const fakeView = new FakeView(container);
      const firstHandleSpy = sinon.spy(fakeView.firstHandle, 'switchVertical');
      const secondHandleSpy = sinon.spy(fakeView.secondHandle, 'switchVertical');
      const rangeLineSpy = sinon.spy(fakeView.rangeLine, 'switchVertical');
      const scaleValueSpy = sinon.spy(fakeView.scaleValues[0], 'switchVertical');

      (view.updateIsVertical.bind(fakeView))(defaultConfig);
      expect(firstHandleSpy.calledOnce).to.equal(true);
      expect(secondHandleSpy.calledOnce).to.equal(true);
      expect(rangeLineSpy.calledOnce).to.equal(true);
      expect(scaleValueSpy.calledOnce).to.equal(true);
    });

    it('should add and remove vertical root class', () => {
      const container = document.createElement('div');
      const view = new View(container);

      view.updateIsVertical({ ...defaultConfig, ...{ isVertical: true } });
      expect(container.querySelectorAll(`.${classes.rootVertical}`).length).to.equal(1);

      view.updateIsVertical({ ...defaultConfig, ...{ isVertical: false } });
      expect(container.querySelectorAll(`.${classes.rootVertical}`).length).to.equal(0);
    });
  });

  describe('updateValueLabelDisplayed', () => {
    it('should call subscribers', () => {
      const container = document.createElement('div');
      const view = new View(container);
      const fakeView = new FakeView(container);
      const firstHandleSpy = sinon.spy(fakeView.firstHandle, 'switchLabel');
      const secondHandleSpy = sinon.spy(fakeView.secondHandle, 'switchLabel');

      (view.updateValueLabelDisplayed.bind(fakeView))(defaultConfig);
      expect(firstHandleSpy.calledOnce).to.equal(true);
      expect(secondHandleSpy.calledOnce).to.equal(true);
    });
  });

  describe('updateScaleDisplayed', () => {
    it('should call subscribers', () => {
      const container = document.createElement('div');
      const view = new View(container);
      const fakeView = new FakeView(container);
      const scaleValueSpy = sinon.spy(fakeView.scaleValues[0], 'switchLabel');

      (view.updateScaleDisplayed.bind(fakeView))(defaultConfig);
      expect(scaleValueSpy.calledOnce).to.equal(true);
    });
  });

  describe('updateStep', () => {
    it('should recalculate scale values number', () => {
      const container = document.createElement('div');
      const view = new View(container);

      view.updateStep(defaultConfig);
      expect(container.querySelectorAll(`.${classes.scaleValue}`).length).to.equal(6);
    });
  });

  describe('updateMin', () => {
    it('should recalculate scale values number', () => {
      const container = document.createElement('div');
      const view = new View(container);

      view.updateMin(defaultConfig);
      expect(container.querySelectorAll(`.${classes.scaleValue}`).length).to.equal(6);
    });
  });

  describe('updateMax', () => {
    it('should recalculate scale values number', () => {
      const container = document.createElement('div');
      const view = new View(container);

      view.updateMax(defaultConfig);
      expect(container.querySelectorAll(`.${classes.scaleValue}`).length).to.equal(6);
    });
  });

  describe('updateFirstValue', () => {
    it('should call subscribers', () => {
      const container = document.createElement('div');
      const view = new View(container);
      const fakeView = new FakeView(container);
      const firstHandleSpy = sinon.spy(fakeView.firstHandle, 'updateValue');
      const secondHandleSpy = sinon.spy(fakeView.secondHandle, 'updateValue');
      const rangeLineSpy = sinon.spy(fakeView.rangeLine, 'render');

      (view.updateFirstValue.bind(fakeView))(defaultConfig);
      expect(firstHandleSpy.calledOnce).to.equal(true);
      expect(secondHandleSpy.calledOnce).to.equal(true);
      expect(rangeLineSpy.calledOnce).to.equal(true);
    });
  });

  describe('updateSecondValue', () => {
    it('should call subscribers', () => {
      const container = document.createElement('div');
      const view = new View(container);
      const fakeView = new FakeView(container);
      const firstHandleSpy = sinon.spy(fakeView.firstHandle, 'updateValue');
      const secondHandleSpy = sinon.spy(fakeView.secondHandle, 'updateValue');
      const rangeLineSpy = sinon.spy(fakeView.rangeLine, 'render');

      (view.updateSecondValue.bind(fakeView))(defaultConfig);
      expect(firstHandleSpy.calledOnce).to.equal(true);
      expect(secondHandleSpy.calledOnce).to.equal(true);
      expect(rangeLineSpy.calledOnce).to.equal(true);
    });
  });

  describe('setfirstHandlePositionSubscriber', () => {
    it('should call subscribers', () => {
      const container = document.createElement('div');
      const view = new View(container);
      const fakeView = new FakeView(container);
      const firstHandleSpy = sinon.spy(fakeView.firstHandle, 'subscribe');

      (view.subscribe.bind(fakeView))('firstHandle', () => {});
      expect(firstHandleSpy.calledOnce).to.equal(true);
    });
  });

  describe('setsecondHandlePositionSubscriber', () => {
    it('should call subscribers', () => {
      const container = document.createElement('div');
      const view = new View(container);
      const fakeView = new FakeView(container);
      const secondHandleSpy = sinon.spy(fakeView.secondHandle, 'subscribe');

      (view.subscribe.bind(fakeView))('secondHandle', () => {});
      expect(secondHandleSpy.calledOnce).to.equal(true);
    });
  });
});
