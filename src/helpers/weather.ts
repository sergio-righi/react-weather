import { HDate } from "helpers";

/**
 * function to return a range of dates from either today or a given date
 * @param {Date | null} date
 * @param {number} length
 * @returns {array} array of two positions (starting date and ending date)
 */
export const getRangeDate = (date: Date, length: number = 7) => {
  const today = date ? new Date(date) : new Date();
  const array = [HDate.toISOString(today)];
  today.setDate(today.getDate() + length);
  array.push(HDate.toISOString(today));
  return array;
};

/**
 * function to return a range of dates from either today or a given date as parameter
 * @param {Date | null} date
 * @param {number} length
 * @param {string} period
 * @returns {string} the range of dates as parameter
 */
export const getRangeDateAsParam = (
  date: Date = new Date(),
  length: number = 7,
  period: string = ""
) => {
  const [start, end] = getRangeDate(date, length);
  return `${start}_${end}${period ? `_${period}` : ""}`;
};

/**
 * function to return a parameter of a given date or the current date with a period
 * @param {Date | null} date
 * @param {string} period
 * @returns
 */
export const getDateAsParam = (date: Date, period: string = "") => {
  const today = date ? new Date(date) : new Date();
  const startTime = HDate.toISOString(today, "0");
  const endTime = HDate.toISOString(today, "23");
  return `${startTime}_${endTime}${period ? `_${period}` : ""}`;
};

/**
 * function to return a parameter of the current date
 * @returns
 */
export const getNowAsParam = () => {
  return HDate.toISOString(new Date());
};

/**
 * function to check if it is day or night considering the sunrise and sunset
 * @param {Date} date current date
 * @param {string} sunrise date of sunrise
 * @param {string} sunset date of sunset
 * @returns {boolean} true if is day and false if is night
 */
export const isDay = (date: Date, sunrise: string, sunset: string) => {
  const d = new Date(date);
  const st = new Date(sunrise);
  const end = new Date(sunset);
  return d >= st && d <= end;
};
