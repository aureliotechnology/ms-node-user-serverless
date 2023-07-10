import { container } from ".";


export class Inject {
  static getClass<T>(classRequire) {
    return container.get<T>(classRequire);
  }

  static getClassNamed<T>(classRequire, named) {
    return container.getNamed<T>(classRequire, named);
  }
}
