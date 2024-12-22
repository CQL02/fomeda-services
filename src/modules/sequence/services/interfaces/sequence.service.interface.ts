export interface ISequenceService {
  generateId(prefix: string): Promise<string>;
  getLastId(prefix: string): Promise<string>;
}
