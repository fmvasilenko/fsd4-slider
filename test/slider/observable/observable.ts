import { expect } from 'chai';
import { Observable } from '../../../src/slider/observable/Observable';
import { Subscriber } from '../../utils/Subscriber';

describe('Observable', () => {
  describe('add', () => {
    it('should add subscriber', () => {
      const observer = new Observable<number>();
      const subscriber = new Subscriber<number>(0);

      observer.add(subscriber.set);
      observer.publish(10);

      expect(subscriber.get()).to.equal(10);
    });
  });

  describe('remove', () => {
    it('should remove subscribers', () => {
      const observer = new Observable<number>();
      const subscriber = new Subscriber<number>(0);

      observer.add(subscriber.set);
      observer.remove(subscriber.set);
      observer.publish(10);

      expect(subscriber.get()).to.equal(0);
    });
  });

  describe('publish', () => {
    it('should call all the subscribers', () => {
      const observer = new Observable<number>();
      const subscriber1 = new Subscriber<number>(0);
      const subscriber2 = new Subscriber<number>(0);

      observer.add(subscriber1.set);
      observer.add(subscriber2.set);
      observer.publish(10);

      expect(subscriber1.get()).to.equal(10);
      expect(subscriber2.get()).to.equal(10);
    });
  });
});
