import { container } from ".";


export class Inject {
  static getClass<T>(classRequire) {
    return container.get<T>(classRequire);
  }
}
