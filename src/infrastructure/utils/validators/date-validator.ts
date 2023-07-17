/* eslint-disable no-restricted-globals */
export abstract class DateValidator {
  static isValidDate(value: any): value is Date {
    return value instanceof Date && !isNaN(value.getTime());
  }
}
