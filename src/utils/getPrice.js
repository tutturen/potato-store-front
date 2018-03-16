function getPrice(priceFloat) {
  let overOne = parseInt(priceFloat, 10);
  let belowOne = Math.round((priceFloat - overOne) * 100);

  if (belowOne > 99) {
    overOne += Math.floor(belowOne / 100);
    belowOne = belowOne % 100;
  }

  const belowText = belowOne < 10 ? `0${belowOne}` : belowOne;
  return `kr ${overOne},${belowText}`;
}

export default getPrice;
