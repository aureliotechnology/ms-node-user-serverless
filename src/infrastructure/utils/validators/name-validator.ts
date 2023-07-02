export class NameValidator {
  constructor(readonly fieldName: string, readonly fieldValue: string) {}

  isEmpty(): boolean {
    return !this.fieldValue || this.fieldValue.trim().length === 0;
  }

  isLargerThan(length: number): boolean {
    return this.fieldValue.length > length;
  }

  isValidPattern(): boolean {
    const nameRegExp = /^[a-zA-ZÀ-ú]+([ '-][a-zA-ZÀ-ú]+)*([ -][a-zA-ZÀ-ú]+)*$/;
    return nameRegExp.test(this.fieldValue);
  }
}
