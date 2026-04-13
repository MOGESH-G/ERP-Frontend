/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyObject = Record<string, any>;

// snake_case → camelCase
export const toCamelCase = (str: string): string =>
  str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());

// camelCase → snake_case
export const toSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);

// Deep convert keys to camelCase
export const keysToCamel = (input: any): any => {
  if (Array.isArray(input)) {
    return input.map(keysToCamel);
  }

  if (input !== null && typeof input === "object") {
    return Object.keys(input).reduce((acc: AnyObject, key) => {
      const camelKey = toCamelCase(key);
      acc[camelKey] = keysToCamel(input[key]);
      return acc;
    }, {});
  }

  return input;
};

// Deep convert keys to snake_case
export const keysToSnake = (input: any): any => {
  if (Array.isArray(input)) {
    return input.map(keysToSnake);
  }

  if (input !== null && typeof input === "object") {
    return Object.keys(input).reduce((acc: AnyObject, key) => {
      const snakeKey = toSnakeCase(key);
      acc[snakeKey] = keysToSnake(input[key]);
      return acc;
    }, {});
  }

  return input;
};
