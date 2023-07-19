import { splitPrice, isUnique } from "../util";

describe('splitPrice()', () => {
  it('splits 84.08', () => {
    const { dollars, cents } = splitPrice(84.08);
    expect(dollars).toBe('84')
    expect(cents).toBe('08')
  })
});

describe('isUnique()', () => {
  it('is unique 01', () => {
    const arr = [0, 1, 2, 3, 4, 5];
    const result = isUnique(arr);

    expect(result).toBe(true)
  })
  it('is unique 02', () => {
    const arr = [0, 1, 2, 2, 4, 5];
    const result = isUnique(arr);

    expect(result).toBe(false)
  })
});