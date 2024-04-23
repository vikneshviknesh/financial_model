import LocalImages from "./images";

const isValidString = (value: string | undefined | null) => {
  return value !== null && value !== undefined && value !== "";
};
export { LocalImages, isValidString };
