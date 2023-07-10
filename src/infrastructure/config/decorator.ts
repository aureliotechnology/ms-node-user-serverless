import 'reflect-metadata';

export function Field(type: any) {
    return (target: Object, propertyKey: string | symbol) => {
      let metadata = Reflect.getMetadata('field', target);
      if (metadata) {
        metadata[propertyKey] = type;
      } else {
        metadata = { [propertyKey]: type };
      }
      Reflect.defineMetadata('field', metadata, target);
    };
  }
  
  export function Entity() {
    return (constructor: Function) => {
      Reflect.defineMetadata('entity', {}, constructor);
    };
  }
  
 export function extractMetadata<T>(instance: T) {
    return instance['metadata'];
  }