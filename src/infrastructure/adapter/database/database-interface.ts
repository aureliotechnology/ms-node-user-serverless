export interface IDataBase<T> {
  getById(id:string): Promise<T | null>
  save(entity: T): Promise<string>;
  update(entityT): Promise<T>;
  delete(entity: T): Promise<void>;
  list(): Promise<Array<T> | []>
}

export interface IDataBaseAdapter {
  getAdapter(model)
}
