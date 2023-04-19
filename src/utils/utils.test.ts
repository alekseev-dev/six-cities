import { checkForEmptyArray, converRatingToStars, converRatingToStarsToRound, getComentData } from './utils';


describe('Function: converRatingToStars', () => {
  it('should return 80 if number is 4', () => {
    expect(converRatingToStars(4))
      .toBe(80);
  });
  it('should return 72 if number is 3.6', () => {
    expect(converRatingToStars(3.6))
      .toBe(72);
  });
  it('should return 28 if number is 1.4', () => {
    expect(converRatingToStars(1.4))
      .toBe(28);
  });
  it('shouldn\'t return 90 if number is 5', () => {
    expect(converRatingToStars(4))
      .not.toBe(90);
  });
  it('shouldn\'t return 50 if number is 3.6', () => {
    expect(converRatingToStars(3.6))
      .not.toBe(80);
  });
  it('shouldn\'t return 20 if number is 1.4', () => {
    expect(converRatingToStars(1.4))
      .not.toBe(20);
  });
});

describe('Function: converRatingToStarsToRound', () => {
  it('should return 80 if number is 4', () => {
    expect(converRatingToStarsToRound(4))
      .toBe(80);
  });
  it('should return 80 if number is 3.6', () => {
    expect(converRatingToStarsToRound(3.6))
      .toBe(80);
  });
  it('should return 20 if number is 1.4', () => {
    expect(converRatingToStarsToRound(1.4))
      .toBe(20);
  });
  it('shouldn\'t return 90 if number is 4', () => {
    expect(converRatingToStarsToRound(4))
      .not.toBe(90);
  });
  it('shouldn\'t return 72 if number is 3.6', () => {
    expect(converRatingToStarsToRound(3.6))
      .not.toBe(72);
  });
  it('shouldn\'t return 28 if number is 1.4', () => {
    expect(converRatingToStarsToRound(1.4))
      .not.toBe(28);
  });
});

describe('Function: getComentData', () => {
  const dataFromServer = '2023-02-14T07:31:23.936Z';
  it('should return data like "February 2023"', () => {
    expect(getComentData(dataFromServer))
      .toEqual('February 2023');
  });
  it('shouldn\'t return data like "July 2023"', () => {
    expect(getComentData(dataFromServer))
      .not.toEqual('July 2023');
  });
});

describe('Function: checkForEmptyArray', () => {
  it('should return true if array > 0', () => {
    const mockArrayFull = [1 , 2 , 3];
    expect(checkForEmptyArray(mockArrayFull))
      .toBe(true);
  });
  it('should return false if array > 0', () => {
    const mockArrayEmpty: [] = [];
    expect(checkForEmptyArray(mockArrayEmpty))
      .toBe(false);
  });
});
