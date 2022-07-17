export function longNumToStr(value) {
  const s = ["", "K", "M", "B", "T"];

  const sNum = Math.floor(("" + value).length / 3);

  let sVal = parseFloat(
    (sNum != 0 ? value / Math.pow(1000, sNum) : value).toPrecision(2)
  );

  if (sVal % 1 != 0) {
    sVal = sVal.toFixed(1);
  }

  return sVal + s[sNum];
}
