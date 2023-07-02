import { NameValidator } from "./name-validator";

describe("NameValidator", () => {
  describe("isEmpty", () => {
    it("should return true if field value is empty", () => {
      const nameValidator = new NameValidator("name", "");
      expect(nameValidator.isEmpty()).toBe(true);
    });

    it("should return true if field value is whitespace only", () => {
      const nameValidator = new NameValidator("name", "   ");
      expect(nameValidator.isEmpty()).toBe(true);
    });

    it("should return false if field value is not empty or whitespace", () => {
      const nameValidator = new NameValidator("name", "Valid Name");
      expect(nameValidator.isEmpty()).toBe(false);
    });
  });

  describe("isLargerThan", () => {
    it("should return true if field value length is larger than specified length", () => {
      const nameValidator = new NameValidator("name", "Valid Name");
      expect(nameValidator.isLargerThan(9)).toBe(true);
    });

    it("should return false if field value length is not larger than specified length", () => {
      const nameValidator = new NameValidator("name", "Valid Name");
      expect(nameValidator.isLargerThan(10)).toBe(false);
    });
  });

  describe("isValidPattern", () => {
    it("should return true if field value matches name pattern", () => {
      const nameValidator = new NameValidator("name", "Valid Name");
      expect(nameValidator.isValidPattern()).toBe(true);
    });

    it("should return false if field value does not match name pattern", () => {
      const nameValidator = new NameValidator("name", "123 Invalid Name");
      expect(nameValidator.isValidPattern()).toBe(false);
    });
  });
});
