export const loadInterestCalculate = (
  interest_rate: string,
  amount: string
) => {
  const interest = parsedStringToInt(interest_rate);
  const amt = parsedStringToInt(amount);
  return ((amt / 100) * interest)?.toString();
};

const parsedStringToInt = (value: string) => {
  return parseInt(value) || 0;
};
