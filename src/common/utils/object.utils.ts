export class ObjectUtils {

  /**
   * Checks if an object is empty (i.e., has no enumerable properties) or is null/undefined.
   *
   * @param obj The object to check.
   * @returns True if the object is null, undefined, or empty, false otherwise.
   */
  static readonly isEmpty = (obj: any): boolean => {
    return obj == null || (typeof obj === 'object' && Object.keys(obj).length === 0);
  }

  /**
   * Checks if an object is not empty (i.e., has enumerable properties) and is not null/undefined.
   *
   * @param obj The object to check.
   * @returns True if the object is not null, undefined, or empty, false otherwise.
   */
  static readonly isNotEmpty = (obj: any): boolean => {
    return !ObjectUtils.isEmpty(obj);
  }
}