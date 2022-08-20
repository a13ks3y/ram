import { Universe } from './universe';
import {TestBed} from '@angular/core/testing';

describe('Universe', () => {
  const WIDTH = 128;
  const HEIGHT = 64;
  let universe;
  beforeEach(() => {
    universe = new Universe(WIDTH, HEIGHT);
  });
  it('should create an instance', () => {
    expect(universe).toBeTruthy();
  });
  it('should has collection of cells', () => {
    expect(universe.cells).toBeInstanceOf(Array);
    expect(universe.cells.length).toEqual(WIDTH * HEIGHT);
  });
  it('should call render method for each cell', () => {
    const ctx = { fillRect: () => {}};
    const cellSpy = spyOn(universe.cells[0], 'render');
    universe.render(ctx);
    expect(cellSpy).toHaveBeenCalledWith(ctx);
  });
  it('getCell should return cell with specific coordinates', () => {
    // arrange
    const expectedX = 0;
    const expectedY = 0;
    // act
    const cell = universe.getCell(expectedX, expectedY);
    // assert
    expect(cell).toBeTruthy();
    expect(cell.x).toEqual(expectedX);
    expect(cell.y).toEqual(expectedY);
  });
  it('mn should return Moore neighborhood', () => {
    const mn = universe.mn(1, 1);
    expect(mn).toBeDefined();
    // expect(mn.length).toEqual(8);
    expect(mn[0].x).toEqual(0);
    expect(mn[0].y).toEqual(0);
    expect(mn[1].x).toEqual(1);
    expect(mn[1].y).toEqual(0);
  });

});
