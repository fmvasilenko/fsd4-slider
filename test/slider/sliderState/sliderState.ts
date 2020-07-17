import { expect } from 'chai';
import { SliderState } from '../../../src/slider/sliderState/sliderState';

describe('sliderState', () => {
  describe('leftHandlePosition.set()', () => {
    it('should set position to the given one', () => {
      const sliderState = new SliderState(0.5, 0.5);
      sliderState.leftHandlePosition.set(0);
      expect(sliderState.leftHandlePosition.get()).to.equal(0);
    });

    it('should change position to 0 if it`s lower then 0', () => {
      const sliderState = new SliderState(0.5, 0.5);
      sliderState.leftHandlePosition.set(-2);
      expect(sliderState.leftHandlePosition.get()).to.equal(0);
    });

    it('should change position to 1 if it`s higher then 1', () => {
      const sliderState = new SliderState(0.5, 0.5);
      sliderState.leftHandlePosition.set(2);
      expect(sliderState.leftHandlePosition.get()).to.equal(1);
    });
  });

  describe('rightHandlePosition.set()', () => {
    it('should set position to the given one', () => {
      const sliderState = new SliderState(0.5, 0.5);
      sliderState.rightHandlePosition.set(0);
      expect(sliderState.rightHandlePosition.get()).to.equal(0);
    });

    it('should change position to 0 if it`s lower then 0', () => {
      const sliderState = new SliderState(0.5, 0.5);
      sliderState.rightHandlePosition.set(-2);
      expect(sliderState.rightHandlePosition.get()).to.equal(0);
    });

    it('should change position to 1 if it`s higher then 1', () => {
      const sliderState = new SliderState(0.5, 0.5);
      sliderState.rightHandlePosition.set(2);
      expect(sliderState.rightHandlePosition.get()).to.equal(1);
    });
  });
});
