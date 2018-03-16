function getPrice(priceFloat) {
  const overOne = parseInt(priceFloat, 10);
  const belowOne = Math.round((priceFloat - overOne) * 100);
  const belowText = belowOne < 10 ? `0${belowOne}` : belowOne;
  return `kr ${overOne},${belowText}`;
}

export default getPrice;
