export interface ISequenceService {
  generateId(prefix: string): Promise<string>;
}
