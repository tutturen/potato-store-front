import getPrice from './getPrice';

describe('getPrice', () => {
  it('should handle zero', () => {
    expect(getPrice(0)).toBe('kr 0,00');
  });

  it('should handle zero', () => {
    expect(getPrice(1)).toBe('kr 1,00');
  });

  it('should display simple price with two decimals', () => {
    expect(getPrice(10.0)).toBe('kr 10,00');
  });

  it('should round up when close to next number', () => {
    expect(getPrice(24.999)).toBe('kr 25,00');
  });

  it('should display two decimals no matter what', () => {
    expect(getPrice(15.5)).toBe('kr 15,50');
  });

  it('should should display a zero in front of low decimals', () => {
    expect(getPrice(5.05)).toBe('kr 5,05');
  });
});
