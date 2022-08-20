import { Rick } from './rick';
import {AudioService} from './audio.service';
import {TestBed} from '@angular/core/testing';

describe('Rick', () => {
  let audioService: AudioService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    audioService = TestBed.inject(AudioService);
  });
  it('should create an instance', () => {
    expect(new Rick(audioService)).toBeTruthy();
  });

  it('should return multiplied numbers', () => {
    const rick = new Rick(audioService);
    expect(rick.multiply(2, 2)).toEqual(4);
    expect(rick.multiply(2, 3)).toEqual(6);
    expect(rick.multiply(2, 5)).toEqual(10);
  });
  it('should increment dy position by ay if falling after logic call', () => {
    const rick = new Rick(audioService);
    rick.setStateFalling();
  });
});
