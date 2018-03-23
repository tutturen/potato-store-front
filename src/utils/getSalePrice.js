import getPrice from './getPrice';

function getSalePrice(priceFloat, cut = 0) {
  const salePrice = priceFloat * (100 - cut) / 100;
  return getPrice(salePrice);
}

export default getSalePrice;
