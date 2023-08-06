import { HDate } from "helpers";

/**
 * function to add leading zeros
 * @param {number} value number to be filled with leading zeros
 * @param {number} size result length (default 2)
 * @returns {string} value if the leading zeros
 */

export const pad = (value: number | string, size: number = 2): string => {
  const num = Number(value);
  return !isNaN(num)
    ? "0".repeat(Math.max(0, size - Math.abs(num).toString().length)) +
    Math.abs(num)
    : "";
};

/**
 * function to convert seconds to days, hours, minutes, seconds
 * @param {number} value time to be converted (in seconds)
 * @returns {{hour?: number, min?: number, sec: number} | number} an object containing the count of days, hours, minutes and seconds or the value itself
 */

export const time = (value: number): { hour?: number, min?: number, sec: number } | number => {
  if (value <= 0) return value;
  else {
    const day = Math.floor(value / 86400);
    const hour = Math.floor((value - day * 86400) / 3600);
    const min = Math.floor((value - day * 86400 - hour * 3600) / 60);
    const sec = Math.floor(value - day * 86400 - hour * 3600 - min * 60);
    return hour > 0 ? { hour, min, sec } : min > 0 ? { min, sec } : { sec };
  }
};

/**
 * function to convert 24-hour time string to AM/PM format
 * @param {number} value time to be converted in seconds
 * @param {boolean} seconds whether the date should include seconds
 * @returns {string} the time in AM/PM format
 */

export const toTimeAmPmString = (
  value: number,
  seconds: boolean = true,
  am: string = "am",
  pm: string = "pm"
): string => {
  const timeString = HDate.toTimeString(value, seconds);
  const time = timeString.split(":");
  const hour = Number(time.shift());
  if (hour >= 12) {
    const diff = 12 - Number(hour);
    return (
      pad(String(Math.abs(diff === 0 ? 12 : diff))) +
      ":" +
      time.map((item: any) => pad(item)).join(":") +
      " " +
      pm
    );
  }
  return timeString + " " + am;
};
