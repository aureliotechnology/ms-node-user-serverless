interface IValidatableEnum<T> {
  [key: string]: T;
}
export abstract class EnumValidator {
  static isEnumValue<T>(value: any, enumObj: IValidatableEnum<T>): value is T {
    return Object.values(enumObj).includes(value);
  }
}
