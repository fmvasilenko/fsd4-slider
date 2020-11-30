/* eslint-disable no-new */
/* eslint-disable class-methods-use-this */
import { expect } from 'chai';
import { HandleView } from '../../../src/slider/view/HandleView';
import { RangeLineView } from '../../../src/slider/view/RangeLineView';
import { ScaleValueView } from '../../../src/slider/view/ScaleValueView';
import { View } from '../../../src/slider/view/View';
import { defaultConfig } from '../../utils/sliderDefaultConfig';

const sinon = require('sinon');
const classes = require('../../../src/slider/slider.classes.json');

enum HandleSide {Left, Right}

class FakeView {
  public leftHandle: HandleView;

  public rightHandle: HandleView;

  public rangeLine: RangeLineView;

  public scaleValues: ScaleValueView[] = [];

  constructor(container: HTMLElement) {
    this.leftHandle = new HandleView(container, HandleSide.Left);
    this.rightHandle = new HandleView(container, HandleSide.Right);
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
      const rightHandleSpy = sinon.spy(fakeView.rightHandle, 'switchHandle');
      const rangeLineSpy = sinon.spy(fakeView.rangeLine, 'render');

      (view.updateIsRange.bind(fakeView))(defaultConfig);
      expect(rightHandleSpy.calledOnce).to.equal(true);
      expect(rangeLineSpy.calledOnce).to.equal(true);
    });
  });

  describe('updateIsVertical', () => {
    it('should call subscribers', () => {
      const container = document.createElement('div');
      const view = new View(container);
      const fakeView = new FakeView(container);
      const leftHandleSpy = sinon.spy(fakeView.leftHandle, 'switchVertical');
      const rightHandleSpy = sinon.spy(fakeView.rightHandle, 'switchVertical');
      const rangeLineSpy = sinon.spy(fakeView.rangeLine, 'switchVertical');
      const scaleValueSpy = sinon.spy(fakeView.scaleValues[0], 'switchVertical');

      (view.updateIsVertical.bind(fakeView))(defaultConfig);
      expect(leftHandleSpy.calledOnce).to.equal(true);
      expect(rightHandleSpy.calledOnce).to.equal(true);
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
      const leftHandleSpy = sinon.spy(fakeView.leftHandle, 'switchLabel');
      const rightHandleSpy = sinon.spy(fakeView.rightHandle, 'switchLabel');

      (view.updateValueLabelDisplayed.bind(fakeView))(defaultConfig);
      expect(leftHandleSpy.calledOnce).to.equal(true);
      expect(rightHandleSpy.calledOnce).to.equal(true);
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

  describe('updateMinValue', () => {
    it('should recalculate scale values number', () => {
      const container = document.createElement('div');
      const view = new View(container);

      view.updateMinValue(defaultConfig);
      expect(container.querySelectorAll(`.${classes.scaleValue}`).length).to.equal(6);
    });
  });

  describe('updateMaxValue', () => {
    it('should recalculate scale values number', () => {
      const container = document.createElement('div');
      const view = new View(container);

      view.updateMaxValue(defaultConfig);
      expect(container.querySelectorAll(`.${classes.scaleValue}`).length).to.equal(6);
    });
  });

  describe('updateLeftHandleValue', () => {
    it('should call subscribers', () => {
      const container = document.createElement('div');
      const view = new View(container);
      const fakeView = new FakeView(container);
      const leftHandleSpy = sinon.spy(fakeView.leftHandle, 'updateValue');
      const rightHandleSpy = sinon.spy(fakeView.rightHandle, 'updateValue');
      const rangeLineSpy = sinon.spy(fakeView.rangeLine, 'render');

      (view.updateLeftHandleValue.bind(fakeView))(defaultConfig);
      expect(leftHandleSpy.calledOnce).to.equal(true);
      expect(rightHandleSpy.calledOnce).to.equal(true);
      expect(rangeLineSpy.calledOnce).to.equal(true);
    });
  });

  describe('updateRightHandleValue', () => {
    it('should call subscribers', () => {
      const container = document.createElement('div');
      const view = new View(container);
      const fakeView = new FakeView(container);
      const leftHandleSpy = sinon.spy(fakeView.leftHandle, 'updateValue');
      const rightHandleSpy = sinon.spy(fakeView.rightHandle, 'updateValue');
      const rangeLineSpy = sinon.spy(fakeView.rangeLine, 'render');

      (view.updateRightHandleValue.bind(fakeView))(defaultConfig);
      expect(leftHandleSpy.calledOnce).to.equal(true);
      expect(rightHandleSpy.calledOnce).to.equal(true);
      expect(rangeLineSpy.calledOnce).to.equal(true);
    });
  });

  describe('setLeftHandlePositionSubscriber', () => {
    it('should call subscribers', () => {
      const container = document.createElement('div');
      const view = new View(container);
      const fakeView = new FakeView(container);
      const leftHandleSpy = sinon.spy(fakeView.leftHandle, 'setPositionSubscriber');

      (view.setLeftHandlePositionSubscriber.bind(fakeView))(() => {});
      expect(leftHandleSpy.calledOnce).to.equal(true);
    });
  });

  describe('setRightHandlePositionSubscriber', () => {
    it('should call subscribers', () => {
      const container = document.createElement('div');
      const view = new View(container);
      const fakeView = new FakeView(container);
      const rightHandleSpy = sinon.spy(fakeView.rightHandle, 'setPositionSubscriber');

      (view.setRightHandlePositionSubscriber.bind(fakeView))(() => {});
      expect(rightHandleSpy.calledOnce).to.equal(true);
    });
  });
});
