/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'chai';
import { SliderValueLabelView } from '../../../src/slider/view/SliderValueLabelView';
import { SliderConfig } from '../../../src/slider/sliderConfig/SliderConfig';

const jsdom = require('jsdom');
const CLASSES: SliderClasses = require('../../../src/slider/sliderClasses.json');

const { JSDOM } = jsdom;
const dom = new JSDOM('<!doctype html><html><body><div class="slider"></div></body></html>');
(global as any).window = dom.window;
(global as any).document = window.document;

enum Side { Left, Right }

describe('sliderValuLabelView', () => {
  describe('default mode', () => {
    it('should create root element in container with valueLabel class', () => {
      const container = document.createElement('div');
      const config = new SliderConfig();
      const valueLabel = new SliderValueLabelView(container, config, Side.Left);

      expect(container.querySelectorAll(`.${CLASSES.VALUE_LABEL}`).length).to.equal(1);
    });

    it('should add leftValueLabel class if it`s leftHandle label', () => {
      const container = document.createElement('div');
      const config = new SliderConfig();
      const valueLabel = new SliderValueLabelView(container, config, Side.Left);

      expect(container.querySelectorAll(`.${CLASSES.LEFT_HANDLE_LABEL}`).length).to.equal(1);
    });

    it('should add rightValueLabel class if it`s rightHandle label', () => {
      const container = document.createElement('div');
      const config = new SliderConfig();
      const valueLabel = new SliderValueLabelView(container, config, Side.Right);

      expect(container.querySelectorAll(`.${CLASSES.RIGHT_HANDLE_LABEL}`).length).to.equal(1);
    });

    it('should not append root to container if valueLabelDisplayed == false', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        valueLabelDisplayed: false,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Left);

      expect(container.querySelectorAll(`.${CLASSES.VALUE_LABEL}`).length).to.equal(0);
    });

    it('should display handleValue', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        leftHandleValue: 50,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Left);

      const foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement;
      expect(foundValueLabel.innerHTML).to.equal('50');
    });
  });

  describe('defaultValuesMode', () => {
    it('should display defaultValue[index]', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        hasDefaultValues: true,
        defaultValues: ['first', 'second', 'third'],
        leftHandleValue: 1,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Left);

      const foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement;
      expect(foundValueLabel.innerHTML).to.equal('second');
    });
  });

  describe('vertical mode', () => {
    it('should add leftHandleLabelVertical class if it`s leftHandle and isVertical === true', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        valueLabelDisplayed: true,
        isVertical: true,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Left);

      expect(container.querySelectorAll(`.${CLASSES.LEFT_HANDLE_LABEL_VERTICAL}`).length).to.equal(1);
    });

    it('should add rightHandleLabelVertical class if it`s rightHandle and isVertical === true', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        valueLabelDisplayed: true,
        isVertical: true,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Right);

      expect(container.querySelectorAll(`.${CLASSES.RIGHT_HANDLE_LABEL_VERTICAL}`).length).to.equal(1);
    });

    it('should not add leftHandleLabelVertical class if it`s leftHandle and isVertical === false', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        valueLabelDisplayed: true,
        isVertical: false,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Left);

      expect(container.querySelectorAll(`.${CLASSES.LEFT_HANDLE_LABEL_VERTICAL}`).length).to.equal(0);
    });

    it('should not add rightHandleLabelVertical class if it`s rightHandle and isVertical === false', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        valueLabelDisplayed: true,
        isVertical: false,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Right);

      expect(container.querySelectorAll(`.${CLASSES.RIGHT_HANDLE_LABEL_VERTICAL}`).length).to.equal(0);
    });
  });

  describe('valueLabelDisplyed.set()', () => {
    it('should append root to container if given true', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        valueLabelDisplayed: false,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Left);

      config.valueLabelDisplayed.set(true);

      expect(container.querySelectorAll(`.${CLASSES.VALUE_LABEL}`).length).to.equal(1);
    });

    it('should remove root from container if given false', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        valueLabelDisplayed: true,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Left);

      config.valueLabelDisplayed.set(false);

      expect(container.querySelectorAll(`.${CLASSES.VALUE_LABEL}`).length).to.equal(0);
    });
  });

  describe('leftHandleValue.set()', () => {
    it('should display leftHandleValue if it`s leftHandle', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        leftHandleValue: 20,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Left);

      config.leftHandleValue.set(50);

      const foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement;
      expect(foundValueLabel.innerHTML).to.equal('50');
    });

    it('should display defaultValues[leftHandleValue] if it`s leftHandle and hasDefaultValues == true', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        hasDefaultValues: true,
        defaultValues: ['first', 'second', 'third'],
        leftHandleValue: 1,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Left);

      config.leftHandleValue.set(0);

      const foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement;
      expect(foundValueLabel.innerHTML).to.equal('first');
    });
  });

  describe('rightHandleValue.set()', () => {
    it('should display rightHandleValue if it`s rightHandle', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        rightHandleValue: 80,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Right);

      config.rightHandleValue.set(50);

      const foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement;
      expect(foundValueLabel.innerHTML).to.equal('50');
    });

    it('should display defaultValues[rightHandleValue] if it`s rightHandle and hasDefaultValues == true', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        hasDefaultValues: true,
        defaultValues: ['first', 'second', 'third'],
        leftHandleValue: 0,
        rightHandleValue: 1,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Right);

      config.rightHandleValue.set(2);

      const foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement;
      expect(foundValueLabel.innerHTML).to.equal('third');
    });
  });

  describe('hasDefaultValues.set()', () => {
    describe('given false', () => {
      it('should display leftHandleValue if it`s leftHandle', () => {
        const container = document.createElement('div');
        const config = new SliderConfig({
          hasDefaultValues: true,
          defaultValues: ['first', 'second', 'third'],
          minValue: 0,
          leftHandleValue: 1,
        });
        const valueLabel = new SliderValueLabelView(container, config, Side.Left);

        config.hasDefaultValues.set(false);

        const foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement;
        expect(foundValueLabel.innerHTML).to.equal('1');
      });

      it('should display rightHandleValue if it`s rightHandle', () => {
        const container = document.createElement('div');
        const config = new SliderConfig({
          isRange: true,
          hasDefaultValues: true,
          defaultValues: ['first', 'second', 'third'],
          minValue: 0,
          leftHandleValue: 0,
          rightHandleValue: 2,
        });
        const valueLabel = new SliderValueLabelView(container, config, Side.Right);

        config.hasDefaultValues.set(false);

        const foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement;
        expect(foundValueLabel.innerHTML).to.equal('2');
      });
    });

    describe('given true', () => {
      it('should display defaultValues[leftHandleValue] if it`s leftHandle and hasDefaultValues == true', () => {
        const container = document.createElement('div');
        const config = new SliderConfig({
          hasDefaultValues: false,
          defaultValues: ['first', 'second', 'third'],
          minValue: 0,
          leftHandleValue: 1,
        });
        const valueLabel = new SliderValueLabelView(container, config, Side.Left);

        config.hasDefaultValues.set(true);

        const foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement;
        expect(foundValueLabel.innerHTML).to.equal('second');
      });

      it('should display defaultValues[rightHandleValue] if it`s rightHandle and hasDefaultValues == true', () => {
        const container = document.createElement('div');
        const config = new SliderConfig({
          isRange: true,
          hasDefaultValues: false,
          defaultValues: ['first', 'second', 'third'],
          minValue: 0,
          leftHandleValue: 0,
          rightHandleValue: 2,
        });
        const valueLabel = new SliderValueLabelView(container, config, Side.Right);

        config.hasDefaultValues.set(true);

        const foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement;
        expect(foundValueLabel.innerHTML).to.equal('third');
      });
    });
  });

  describe('defaultValues.set()', () => {
    it('should display new defaultValues[leftHandleValue] if it`s leftHandle and hasDefaultValues == true', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        hasDefaultValues: true,
        defaultValues: ['first', 'second', 'third'],
        minValue: 0,
        leftHandleValue: 1,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Left);

      config.defaultValues.set(['frist', 'newValue', 'third']);

      const foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement;
      expect(foundValueLabel.innerHTML).to.equal('newValue');
    });

    it('should display new defaultValues[rightHandleValue] if it`s rightHandle and hasDefaultValues == true', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        isRange: true,
        hasDefaultValues: true,
        defaultValues: ['first', 'second', 'third'],
        minValue: 0,
        leftHandleValue: 0,
        rightHandleValue: 1,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Right);

      config.defaultValues.set(['frist', 'newValue', 'third']);

      const foundValueLabel = container.querySelector(`.${CLASSES.VALUE_LABEL}`) as HTMLElement;
      expect(foundValueLabel.innerHTML).to.equal('newValue');
    });
  });

  describe('isVertical.set()', () => {
    it('should add leftHandleLabelVertical class if it`s leftHandle label and given true', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        valueLabelDisplayed: true,
        isVertical: false,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Left);

      config.isVertical.set(true);

      expect(container.querySelectorAll(`.${CLASSES.LEFT_HANDLE_LABEL_VERTICAL}`).length).to.equal(1);
    });

    it('should add rightHandleLabelVertical class if it`s rightHandle label and given true', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        valueLabelDisplayed: true,
        isVertical: false,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Right);

      config.isVertical.set(true);

      expect(container.querySelectorAll(`.${CLASSES.RIGHT_HANDLE_LABEL_VERTICAL}`).length).to.equal(1);
    });

    it('should remove leftHandleLabelVertical class if it`s leftHandle label and given false', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        valueLabelDisplayed: true,
        isVertical: true,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Left);

      config.isVertical.set(false);

      expect(container.querySelectorAll(`.${CLASSES.LEFT_HANDLE_LABEL_VERTICAL}`).length).to.equal(0);
    });

    it('should remove rightHandleLabelVertical class if it`s rightHandle label and given false', () => {
      const container = document.createElement('div');
      const config = new SliderConfig({
        valueLabelDisplayed: true,
        isVertical: true,
      });
      const valueLabel = new SliderValueLabelView(container, config, Side.Right);

      config.isVertical.set(false);

      expect(container.querySelectorAll(`.${CLASSES.RIGHT_HANDLE_LABEL_VERTICAL}`).length).to.equal(0);
    });
  });
});
