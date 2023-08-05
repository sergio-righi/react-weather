import { Constants } from "utils";

/**
 * function to interpolate a string with their respective values
 * @param {string} str string e.g. the {{user}} must be logged in
 * @param {any} obj object e.g. { user: 'username' }
 * @return {string} the username must be logged in
 */

export const interpolate = (str: string, obj: any): string => {
  return Object.keys(obj).reduce((previousValue: string, currentValue: string) => {
    return previousValue.replaceAll(`{{${currentValue}}}`, obj[currentValue]);
  }, str);
};

/**
 * function to interpolate a URL with their respective values
 * @param {string} url string e.g. /foo/bar/:id
 * @param {any} obj object e.g. { id: 12345 }
 * @return {string} /foo/bar/12345
 */

export const interpolateURL = (url: string, obj: any): string => {
  return Object.keys(obj).reduce((previousValue: string, currentValue: string) => {
    return previousValue.replaceAll(`:${currentValue}`, obj[currentValue]);
  }, url);
};

/**
 * function to convert a given obj to query string
 * @param {string} url  string e.g. /foo/bar
 * @param {any} obj the object to be converted e.g. { id: 123, name: "xyz" }
 * @returns {string} queryString e.g. "/foo/bar?id=123&name=xyz"
 */

export const toQueryString = (url: string, obj: any): string => {
  return url + "?" + Object.keys(obj).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])).join('&');
}

/**
 * function to return the respective greeting to the user according to the current time
 * @return {string} the greeting message
 */

export const greeting = (): string => {
  const hour = new Date().getHours();
  return hour < 12 ? 'good_morning' : hour > 12 && hour < 18 ? 'good_afternoon' : hour > 22 ? 'hello' : 'good_evening'
}

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
 * function to calculate the days between two dates
 * @param {string | Date} a the date to be compared
 * @param {string | Date} b the date to be compared
 * @return {number} number of the days
 */

export const inBetween = (a: string | Date, b: string | Date): number => {
  const inBetween = new Date(b).getTime() - new Date(a).getTime();
  return Math.round(inBetween / (1000 * 60 * 60 * 24));
}

/**
 * function to compare two given dates
 * @param {string | Date} a the date to be compared
 * @param {string | Date} b the date to be compared
 * @return {boolean} if the dates are the same
 */

export const isDateEquals = (a: string | Date, b: string | Date): boolean => {
  return clearTime(a).getTime() === clearTime(b).getTime();
}

/**
 * function to return a friendly date
 * @return {string} the friendly date message
 */

export const toRelativeDate = (str: string | number, t: any, locale: string = "en", dateOnly: boolean = false): string => {
  const date = new Date(str);
  const today = clearTime(new Date());
  const days = inBetween(date, today);
  const dateWithoutTime = clearTime(date);
  const tomorrow = clearTime(new Date(today).setDate(today.getDate() + 1));
  const yesterday = clearTime(new Date(today).setDate(today.getDate() - 1));

  return (isDateEquals(dateWithoutTime, today)) ? dateOnly ? t.today : interpolate(t.today_at, { time: date.toLocaleTimeString(locale, { ...Constants.TIME_FORMAT }) }) :
    (isDateEquals(dateWithoutTime, tomorrow)) ? dateOnly ? t.tomorrow : interpolate(t.tomorrow_at, { time: date.toLocaleTimeString(locale, { ...Constants.TIME_FORMAT }) }) :
      (isDateEquals(dateWithoutTime, yesterday)) ? dateOnly ? t.yesterday : interpolate(t.yesterday_at, { time: date.toLocaleTimeString(locale, { ...Constants.TIME_FORMAT }) }) :
        Math.abs(days) <= 3 ? days > 0 ? interpolate(t.day_ago, { day: Math.abs(days) }) : interpolate(t.in_day, { day: Math.abs(days) }) : dateOnly ? date.toLocaleDateString(locale, { ...Constants.DATE_FORMAT }) : date.toLocaleString(locale, { ...Constants.DATE_FORMAT, ...Constants.TIME_FORMAT });
}

/**
 * function to join classNames
 * @param {any} args classes
 * @return {string} merged array of classes
 */

export const classNames = (...args: any): string => {
  return args.filter((x: any) => !!x).join(" ");
}

/**
 * function to change a position in the array (for state)
 * @param {any[]} arr array to be modified
 * @param {number} index index to be updated
 * @param {any} value value to be updated
 * @return {any[]} merged array of classes
 */

export const setArrayIndex = (arr: any[], index: number, value: any) => {
  const items = [...arr];
  items[index] = value;
  return items;
}

/**
 * function to check if the given dates are equal
 * @param {date} a date
 * @param {date} b date
 * @returns {boolean} true if the dates are equal
 */

export const compareTo = (a: Date, b: Date): boolean => {
  return !a || !b
    ? false
    : a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();
};

/**
 * function to check if the assigned date is within the given range
 * @param {date} value date to be tested
 * @param {date} min min date
 * @param {date} max max date
 * @returns {boolean} true if the date is within the range
 */

export const inRange = (value: Date, min?: Date, max?: Date): boolean => {
  if (!value) return false;
  return min && max
    ? (value > min || compareTo(value, min)) && (value < max || compareTo(value, max))
    : min && !max
      ? value > min || compareTo(value, min)
      : !min && max
        ? value < max || compareTo(value, max)
        : true;
};

/**
 * function to add leading zeros
 * @param {number} value number to be filled with leading zeros
 * @param {number} size result length (default 2)
 * @returns {string} value if the leading zeros
 */

export const pad = (value: number | any, size: number = 2): string => {
  return !isNaN(Number.parseFloat(value))
    ? "0".repeat(Math.max(0, size - Math.abs(value).toString().length)) +
    Math.abs(value)
    : "";
};

/**
 * function to generate an array of a given size
 * @param {number} count size of the array 
 * @returns {array} array of numbers
 */

export const generateArray = (count: number): Array<number> => {
  return Array.from(Array(count).keys());
}

/**
 * function to remove all non numeric characters from a string
 * @param {string} value the maked string
 * @returns {string} the new string with only numeric characters
 */

export const onlyNumber = (value: string): string => {
  return value.replace(/\D/g, "");
}

/**
 * function to remove all properties that contains null or undefined values
 * @param {Object} obj the object to be modified
 * @returns {Object} the new object with all properties removed
 */

export const removeFromObject = (obj: any): Object => {
  Object.keys(obj).forEach((key: string) => {
    if (obj[key] === null) {
      delete obj[key];
    }
  });
  return obj;
}

/**
 * it simulates a asynchronous call to an API function
 * @param {Function} callback the function to be called
 */

export const asyncMethod = async (callback: Function) => {
  const delayPromise = (ms: number) => new Promise(res => setTimeout(res, ms))
  await delayPromise(500)
  return callback()
}

/**
 * get enum value by key
 * @param {enum} enumerator enum to be used
 * @param {string} key key to be searched 
 * @returns 
 */

export const getEnumByKey = (enumerator: any, key: string) => {
  const indexOf = Object.values(enumerator).indexOf(key as unknown);
  return indexOf !== -1 ? Object.keys(enumerator)[indexOf] : null;
}

/**
 * it deeply merges two objects (only given properties are replaced)
 * @param {object} source the source object 
 * @param {object} replacement the object to be merged with the source
 * @returns {object} the merged object
 */

export const deepInterpolation = (source: any, replacement: any): any => {
  // Create a copy of the original object to avoid modifying the original data
  const result = { ...source };

  // Recursively merge the replacement object into the original object
  const mergeObjects = (obj1: any, obj2: any) => {
    for (const key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        if (obj2[key] instanceof Object && obj1.hasOwnProperty(key) && obj1[key] instanceof Object) {
          mergeObjects(obj1[key], obj2[key]);
        } else {
          obj1[key] = obj2[key];
        }
      }
    }
  };

  mergeObjects(result, replacement);

  return result;
}

/**
 * method that returns the propert text color according to the provided background color based on the luminance
 * @param {string} backgroundColor the background to be used as reference
 * @param {string} black the color to be used in case its black
 * @param {string} white the color to be used in case its white 
 * @returns {string} the contrast color
 */

export const getContrast = (backgroundColor: string, black: string = "black", white: string = "white"): string => {
  // Helper function to convert a hex color to an RGB array
  const hexToRgb = (hex: string): [number, number, number] => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  // Helper function to calculate the luminance of an RGB color
  const getLuminance = ([r, g, b]: [number, number, number]): number => {
    const [rl, gl, bl] = [r / 255, g / 255, b / 255];
    const [rSrgb, gSrgb, bSrgb] = [
      rl <= 0.03928 ? rl / 12.92 : ((rl + 0.055) / 1.055) ** 2.4,
      gl <= 0.03928 ? gl / 12.92 : ((gl + 0.055) / 1.055) ** 2.4,
      bl <= 0.03928 ? bl / 12.92 : ((bl + 0.055) / 1.055) ** 2.4,
    ];
    return 0.2126 * rSrgb + 0.7152 * gSrgb + 0.0722 * bSrgb;
  };

  // Convert the background color to RGB format
  let rgbColor: [number, number, number];
  if (backgroundColor.startsWith("#")) {
    rgbColor = hexToRgb(backgroundColor);
  } else if (backgroundColor.startsWith("rgb(")) {
    const rgbValues = backgroundColor
      .substring(4, backgroundColor.length - 1)
      .split(",")
      .map((value) => parseInt(value.trim(), 10));
    rgbColor = [rgbValues[0], rgbValues[1], rgbValues[2]];
  } else {
    throw new Error("Invalid background color format. Please provide a color in hex or RGB format.");
  }

  // Calculate the luminance of the background color
  const luminance = getLuminance(rgbColor);

  // Determine the recommended text color based on luminance
  return luminance > 0.5 ? black : white;
}
