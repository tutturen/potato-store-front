function getPrice(priceFloat) {
  let integer = parseInt(priceFloat, 10);
  let fraction = Math.round((priceFloat - integer) * 100);

  if (fraction > 99) {
    // fraction*100 was >= 99.5, which means it was rounded up to 100.0.
    integer += 1;
    fraction = 0;
  }

  const belowText = fraction < 10 ? `0${fraction}` : fraction;
  return `kr ${integer},${belowText}`;
}

export default getPrice;
