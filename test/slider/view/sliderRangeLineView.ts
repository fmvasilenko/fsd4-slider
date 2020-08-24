/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'chai';
import { SliderRangeLineView } from '../../../src/slider/view/SliderRangeLineView';
import { SliderConfig } from '../../../src/slider/sliderConfig/SliderConfig';

const jsdom = require('jsdom');
const CLASSES: SliderClasses = require('../../../src/slider/sliderClasses.json');

const { JSDOM } = jsdom;
const dom = new JSDOM('<!doctype html><html><body><div class="slider"></div></body></html>');
(global as any).window = dom.window;
(global as any).document = window.document;

describe('sliderRangeLineView', () => {
  describe('default mode', () => {
    it('should create root element with rangeLine class and append it to the container', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      expect(container.querySelectorAll(`.${CLASSES.RANGE_LINE}`).length).to.equal(1);
    });

    it('should not append root to container if config.isRange == false', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: false,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      expect(container.querySelectorAll(`.${CLASSES.RANGE_LINE}`).length).to.equal(0);
    });

    it('should set left shift to 20% if leftHandleValue == 20 and range == 100', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        leftHandleValue: 20,
        minValue: 0,
        maxValue: 100,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
      expect(foundRangeLine.style.left).to.equal('20%');
    });

    it('should set right shift to 20% if rightHandleValue == 80 and range == 100', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        rightHandleValue: 80,
        minValue: 0,
        maxValue: 100,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
      expect(foundRangeLine.style.right).to.equal('20%');
    });
  });

  describe('defaultValues mode', () => {
    it('should set left shift to 50% if leftHandleValue == 1 and defaultValues.length == 3', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        hasDefaultValues: true,
        defaultValues: ['first', 'second', 'third'],
        leftHandleValue: 1,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
      expect(foundRangeLine.style.left).to.equal('50%');
    });

    it('should set right shift to 50% if rightHandleValue == 1 and defaultValues.length == 3', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        hasDefaultValues: true,
        defaultValues: ['first', 'second', 'third'],
        leftHandleValue: 0,
        rightHandleValue: 1,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
      expect(foundRangeLine.style.right).to.equal('50%');
    });
  });

  describe('vertical mode', () => {
    it('should add rangeLineVertical class to the root if isVertical == true', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        isVertical: true,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      expect(container.querySelectorAll(`.${CLASSES.RANGE_LINE_VERTICAL}`).length).to.equal(1);
    });

    it('should set bottom shift to 20% if leftHandleValue == 20, range == 100 and isVertical == true', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        isVertical: true,
        leftHandleValue: 20,
        minValue: 0,
        maxValue: 100,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
      expect(foundRangeLine.style.bottom).to.equal('20%');
    });

    it('should set top shift to 20% if rightHandleValue == 80, range == 100 and isVertical == true', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        isVertical: true,
        rightHandleValue: 80,
        minValue: 0,
        maxValue: 100,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
      expect(foundRangeLine.style.top).to.equal('20%');
    });
  });

  describe('config.leftHandleValue.set()', () => {
    it('should change left shift according with the given value if isVertical == false', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        leftHandleValue: 20,
        minValue: 0,
        maxValue: 100,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      config.leftHandleValue.set(40);

      const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
      expect(foundRangeLine.style.left).to.equal('40%');
    });

    it('should change bottom shift according with the given value if isVertical == true', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        isVertical: true,
        leftHandleValue: 20,
        minValue: 0,
        maxValue: 100,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      config.leftHandleValue.set(40);

      const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
      expect(foundRangeLine.style.bottom).to.equal('40%');
    });
  });

  describe('config.rightHandleValue.set()', () => {
    it('should change right shift according with the given value if isVertical == false', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        rightHandleValue: 80,
        minValue: 0,
        maxValue: 100,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      config.rightHandleValue.set(60);

      const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
      expect(foundRangeLine.style.right).to.equal('40%');
    });

    it('should change top shift according with the given value if isVertical == true', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        isVertical: true,
        rightHandleValue: 80,
        minValue: 0,
        maxValue: 100,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      config.rightHandleValue.set(60);

      const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
      expect(foundRangeLine.style.top).to.equal('40%');
    });
  });

  describe('config.isVertical.set()', () => {
    it('should change left shift to bottom shift', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        leftHandleValue: 20,
        minValue: 0,
        maxValue: 100,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      config.isVertical.set(true);

      const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
      expect(foundRangeLine.style.left).to.equal('');
      expect(foundRangeLine.style.bottom).to.equal('20%');
    });

    it('should change right shift to top shift', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        rightHandleValue: 80,
        minValue: 0,
        maxValue: 100,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      config.isVertical.set(true);

      const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
      expect(foundRangeLine.style.right).to.equal('');
      expect(foundRangeLine.style.top).to.equal('20%');
    });

    it('should add rangeLineVertical class if given true', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        isVertical: false,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      config.isVertical.set(true);

      expect(container.querySelectorAll(`.${CLASSES.RANGE_LINE_VERTICAL}`).length).to.equal(1);
    });

    it('should remove rangeLineVertical class if given false', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        isVertical: true,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      config.isVertical.set(false);

      expect(container.querySelectorAll(`.${CLASSES.RANGE_LINE_VERTICAL}`).length).to.equal(0);
    });
  });

  describe('config.hasDefaultValues.set()', () => {
    describe('default mode', () => {
      it('should change left shift to 50% if given true, leftHandleValue == 1 and defaultValues.length == 3', () => {
        const container = document.createElement('div');
        const config = new SliderConfig({
          isRange: true,
          hasDefaultValues: false,
          defaultValues: ['first', 'second', 'third'],
          minValue: 0,
          leftHandleValue: 1,
          rightHandleValue: 2,
        });
        const rangeLine = new SliderRangeLineView(container, config);

        config.hasDefaultValues.set(true);

        const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
        expect(foundRangeLine.style.left).to.equal('50%');
      });

      it('should change right shift to 50% if given true, rightHandleValue == 1 and defaultValues.length == 3', () => {
        const container = document.createElement('div');
        const config = new SliderConfig({
          isRange: true,
          hasDefaultValues: false,
          defaultValues: ['first', 'second', 'third'],
          minValue: 0,
          leftHandleValue: 0,
          rightHandleValue: 1,
        });
        const rangeLine = new SliderRangeLineView(container, config);

        config.hasDefaultValues.set(true);

        const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
        expect(foundRangeLine.style.right).to.equal('50%');
      });

      it('should change left shift to 1% if given false, leftHandleValue == 1 and range = 100', () => {
        const container = document.createElement('div');
        const config = new SliderConfig({
          isRange: true,
          hasDefaultValues: true,
          defaultValues: ['first', 'second', 'third'],
          minValue: 0,
          leftHandleValue: 1,
          rightHandleValue: 2,
        });
        const rangeLine = new SliderRangeLineView(container, config);

        config.hasDefaultValues.set(false);

        const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
        expect(foundRangeLine.style.left).to.equal('1%');
      });

      it('should change right shift to 99% if given false, rightHandleValue == 1 and range = 100', () => {
        const container = document.createElement('div');
        const config = new SliderConfig({
          isRange: true,
          hasDefaultValues: true,
          defaultValues: ['first', 'second', 'third'],
          minValue: 0,
          leftHandleValue: 0,
          rightHandleValue: 1,
        });
        const rangeLine = new SliderRangeLineView(container, config);

        config.hasDefaultValues.set(false);

        const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
        expect(foundRangeLine.style.right).to.equal('99%');
      });
    });

    describe('vertical mode', () => {
      it('should change bottom shift to 50% if given true, leftHandleValue == 1 and defaultValues.length == 3', () => {
        const container = document.createElement('div');
        const config = new SliderConfig({
          isRange: true,
          isVertical: true,
          hasDefaultValues: false,
          defaultValues: ['first', 'second', 'third'],
          minValue: 0,
          leftHandleValue: 1,
          rightHandleValue: 2,
        });
        const rangeLine = new SliderRangeLineView(container, config);

        config.hasDefaultValues.set(true);

        const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
        expect(foundRangeLine.style.bottom).to.equal('50%');
      });

      it('should change top shift to 50% if given true, rightHandleValue == 1 and defaultValues.length == 3', () => {
        const container = document.createElement('div');
        const config = new SliderConfig({
          isRange: true,
          isVertical: true,
          hasDefaultValues: false,
          defaultValues: ['first', 'second', 'third'],
          minValue: 0,
          leftHandleValue: 0,
          rightHandleValue: 1,
        });
        const rangeLine = new SliderRangeLineView(container, config);

        config.hasDefaultValues.set(true);

        const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
        expect(foundRangeLine.style.top).to.equal('50%');
      });

      it('should change bottom shift to 1% if given false, leftHandleValue == 1 and range = 100', () => {
        const container = document.createElement('div');
        const config = new SliderConfig({
          isRange: true,
          isVertical: true,
          hasDefaultValues: true,
          defaultValues: ['first', 'second', 'third'],
          minValue: 0,
          leftHandleValue: 1,
          rightHandleValue: 2,
        });
        const rangeLine = new SliderRangeLineView(container, config);

        config.hasDefaultValues.set(false);

        const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
        expect(foundRangeLine.style.bottom).to.equal('1%');
      });

      it('should change top shift to 99% if given false, rightHandleValue == 1 and range = 100', () => {
        const container = document.createElement('div');
        const config = new SliderConfig({
          isRange: true,
          isVertical: true,
          hasDefaultValues: true,
          defaultValues: ['first', 'second', 'third'],
          minValue: 0,
          leftHandleValue: 0,
          rightHandleValue: 1,
        });
        const rangeLine = new SliderRangeLineView(container, config);

        config.hasDefaultValues.set(false);

        const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
        expect(foundRangeLine.style.top).to.equal('99%');
      });
    });
  });

  describe('isRange.set()', () => {
    it('should append root to the container if isRange == true', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: false,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      config.isRange.set(true);

      expect(container.querySelectorAll(`.${CLASSES.RANGE_LINE}`).length).to.equal(1);
    });

    it('should remove root from container if isRange == false', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      config.isRange.set(false);

      expect(container.querySelectorAll(`.${CLASSES.RANGE_LINE}`).length).to.equal(0);
    });
  });

  describe('config.minValue.set()', () => {
    it('should change left shift according with the new range', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        minValue: 0,
        maxValue: 100,
        leftHandleValue: 50,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      config.minValue.set(50);

      const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
      expect(foundRangeLine.style.left).to.equal('0%');
    });

    it('should change right shift according with the new range', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        minValue: 0,
        maxValue: 100,
        rightHandleValue: 80,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      config.minValue.set(50);

      const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
      expect(foundRangeLine.style.right).to.equal('40%');
    });
  });

  describe('config.maxValue.set()', () => {
    it('should change left shift according with the new range', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        minValue: 0,
        maxValue: 100,
        leftHandleValue: 20,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      config.maxValue.set(50);

      const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
      expect(foundRangeLine.style.left).to.equal('40%');
    });

    it('should change right shift according with the new range', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        minValue: 0,
        maxValue: 100,
        rightHandleValue: 50,
      });
      const rangeLine = new SliderRangeLineView(container, config);

      config.maxValue.set(50);

      const foundRangeLine = container.querySelector(`.${CLASSES.RANGE_LINE}`) as HTMLElement;
      expect(foundRangeLine.style.right).to.equal('0%');
    });
  });
});
