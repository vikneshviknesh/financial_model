export const getLuckDrawNumbers = (): number[] => {
  const count = { max: 20, min: 1 };
  let noOfSpin = 3;
  let localArray: number[] = [];
  while (noOfSpin > 0) {
    let spinnedValue = generateRandom(count.min, count.max, localArray);
    localArray.push(spinnedValue);
    noOfSpin -= 1;
    if (noOfSpin === 0) {
      return localArray;
    }
  }
  return [];
};

const generateRandom = (
  min: number,
  max: number,
  localArray: number[]
): number => {
  let spinnedValue = Math.floor(Math.random() * (max - min + 1)) + min;
  const isValueExists =
    localArray.length > 0 ? localArray.includes(spinnedValue) : false;

  return isValueExists ? generateRandom(min, max, localArray) : spinnedValue;
};
