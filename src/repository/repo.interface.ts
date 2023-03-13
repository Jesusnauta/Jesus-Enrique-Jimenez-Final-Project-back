export interface Repo<T> {
  query(): Promise<T[]>;
  queryId(id: string): Promise<T>;
  create(user: Partial<T>): Promise<T>;
  update(user: Partial<T>): Promise<T>;
  destroy(id: string): Promise<void>;
}
