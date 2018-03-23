import getSalePrice from './getSalePrice';

describe('getSalePrice', () => {
  it('should handle zero', () => {
    expect(getSalePrice(0, 0)).toBe('kr 0,00');
  });

  it('should handle zero', () => {
    expect(getSalePrice(1, 50)).toBe('kr 0,50');
  });

  it('should display simple price with two decimals', () => {
    expect(getSalePrice(10.0, 20)).toBe('kr 8,00');
  });

  it('should round up when close to next number', () => {
    expect(getSalePrice(24.999, 50)).toBe('kr 12,50');
  });

  it('should display two decimals no matter what', () => {
    expect(getSalePrice(15.5, 90)).toBe('kr 1,55');
  });

  it('should should display a zero in front of low decimals', () => {
    expect(getSalePrice(5.05, 20)).toBe('kr 4,04');
  });
});
