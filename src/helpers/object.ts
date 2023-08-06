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
        if (
          obj2[key] instanceof Object &&
          obj1.hasOwnProperty(key) &&
          obj1[key] instanceof Object
        ) {
          mergeObjects(obj1[key], obj2[key]);
        } else {
          obj1[key] = obj2[key];
        }
      }
    }
  };

  mergeObjects(result, replacement);

  return result;
};
