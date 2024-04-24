import moment from "moment";
import { TimeOfDayInterface } from "../model/luckyDraw";

export const today = moment().format("DD/MM/YYYY");

export const currentDateTime = moment().format("DD-MM-YYYY HH:MM:SS");

export const getTimeOfDay = (): TimeOfDayInterface => {
  const [day, hour, am_pm] = moment().format("dddd,h,A").split(",");
  let dateOut: TimeOfDayInterface;
  const hr = parseInt(hour);

  if (am_pm === "AM") {
    dateOut = `morning`;
  } else {
    if (hr === 12 || hr < 6) {
      dateOut = `afternoon`;
    } else {
      dateOut = `evening`;
    }
  }
  return dateOut;
};

export const getFormattedDate = (
  date: string,
  existingFormat: string,
  proposedFormat: string
) => {
  return moment(date, existingFormat).format(proposedFormat);
};
