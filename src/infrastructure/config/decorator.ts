import 'reflect-metadata';

// Vamos definir alguns decorators para ajudar a criar nossos esquemas

export function Entity() {
  return (constructor: Function) => {
    // Registrar a entidade para posterior uso
    Reflect.defineMetadata('entity', {}, constructor);
  }
}

export function Field(type: any) {
  return (target: Object, propertyKey: string | symbol) => {
    // Registrar o campo e o tipo para posterior uso
    Reflect.defineMetadata('field', type, target, propertyKey);
  }
}