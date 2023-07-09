export interface DatabaseAdapter {
  setConfig(schema, location)
  create<T>(entity: any): Promise<T> 
  findAll<T>(): Promise<T[]>
  findOne<T>(id: string): Promise<T | null>
  update<T>(id: string, updated: Partial<T>): Promise<T | null>
  delete<T>(id: string): Promise<T | null>

}


export interface IDataBaseAdapter {
  getAdapter(model)
}
