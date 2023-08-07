import { HNumber, HType, HValidation } from "helpers";

/**
 * function to remove time from date
 * @param {string} date the date to be updated
 * @return {Date} the date without time
 */

export const clearTime = (date: string | Date | number): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

/**
 * function to compare two given dates
 * @param {string | Date} a the date to be compared
 * @param {string | Date} b the date to be compared
 * @return {boolean} if the dates are the same
 */

export const isDateEquals = (a: Date | string, b: Date | string): boolean => {
  return clearTime(a).getTime() === clearTime(b).getTime();
};

/**
 * function to return a given date in the correct format
 * @param {Date} date date to be looked up
 * @param {string} locale locale
 * @returns {string | null} the formatted date
 */

export const formattedDate = (date: Date, locale: string = "EN"): string | null => {
  if (!date) return null;
  return date.toLocaleDateString(locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

/**
 * function to convert seconds to time string (00:00:00)
 * @param {number} value time to be converted (in seconds)
 * @param {boolean} seconds whether the date should include seconds
 * @returns {string} an object containing the count of days, hours, minutes and seconds as string
 */

export const toTimeString = (value: number, seconds: boolean = true): string => {
  const response = HNumber.time(value);
  if (HType.isObject(response)) {
    const length = Object.keys(response).length;
    const mapped = Object.values(response)
      .map((item: any) => HNumber.pad(item))
      .join(":");
    return length === 1
      ? "00:" + mapped
      : length === 3 && !seconds
        ? mapped.slice(0, 5)
        : mapped;
  }
  return "00:00";
};

/**
 * function to convert date to ISO string
 * @param {Date} date the date to be converted
 * @param {string} time the time to be set
 * @returns {string} date as ISO string
 */

export const toISOString = (date: Date, time?: string): string => {
  if (!date) return "";
  const dateISO = date.toISOString();
  const dateString = dateISO.split("T")[0];
  const newTime = HValidation.hasValue(time)
    ? time
    : toTimeString(toSeconds(date));
  return dateString + "T" + newTime + "Z";
};

/**
 * function to return a friendly date
 * @param {Date} d the date to be converted
 * @param {object} t list of words (from translations)
 * @param {string} locale language to be used for formatting
 * @return {string} the friendly date message
 */

export const toRelativeDate = (d: string | Date, t: any, locale: string = "EN"): string => {
  const date = new Date(d);
  const today = clearTime(new Date());
  const tomorrow = clearTime(new Date(today).setDate(today.getDate() + 1));

  return isDateEquals(date, today)
    ? t.today
    : isDateEquals(date, tomorrow)
      ? t.tomorrow
      : formattedDate(date, locale);
};

/**
 * function to convert 24-hour time string to AM/PM format
 * @param {number} value time to be converted in seconds
 * @param {boolean} seconds whether the date should include seconds
 * @returns {string} the time in AM/PM format
 */

export const toTimeAmPmString = (value: number, seconds: boolean = true, am: string = "am", pm: string = "pm"): string => {
  const timeString = toTimeString(value, seconds);
  const time = timeString.split(":");
  const hour = Number(time.shift());
  if (hour >= 12) {
    const diff = 12 - Number(hour);
    return HNumber.pad(Math.abs(diff === 0 ? 12 : diff)) + ":" + time.map((item) => HNumber.pad(item))
      .join(":") + " " + pm;
  }
  return timeString + " " + am;
};

/**
 * function to convert a given time (from date) to its equivalent in seconds
 * @param {Date} value the date to be converted
 * @returns {number} the time in seconds
 */

export const toSeconds = (value: Date): number => {
  if (!value) return 0;
  const hours = value.getHours();
  const minutes = value.getMinutes();
  const seconds = value.getSeconds();
  return hours * 3600 + minutes * 60 + seconds;
};

/**
 * function to return the name of the weekday of a given date
 * @param {Date} date date to be looked up
 * @param {string} locale locale
 * @returns {string} the name of the weekday
 */

export const weekday = (date: Date, locale: string = "EN") => {
  if (!date) return null;
  return date.toLocaleDateString(locale, {
    weekday: "long",
  });
};

/**
 * function to convert seconds to days, hours, minutes, seconds
 * @param {number} value time to be converted (in seconds)
 * @returns {any} an object containing the count of days, hours, minutes and seconds or the value itself
 */

export const time = (value: number): any => {
  if (value <= 0) return value;
  else {
    const day = Math.floor(value / 86400);
    const hour = Math.floor((value - day * 86400) / 3600);
    const min = Math.floor((value - day * 86400 - hour * 3600) / 60);
    const sec = Math.floor(value - day * 86400 - hour * 3600 - min * 60);
    return hour > 0
      ? { hour, min, sec }
      : min > 0
        ? { min, sec }
        : { sec };
  }
};