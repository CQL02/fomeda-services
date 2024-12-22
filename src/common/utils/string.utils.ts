export class StringUtils {
  /**
   * Capitalizes the first letter of the given string.
   *
   * This method will take a string and return a new string with the first letter converted to uppercase,
   * while the rest of the string remains unchanged. If the input string is empty, it will return the empty string.
   *
   * Example:
   * ```typescript
   * StringUtilsService.capitalize('hello'); // Returns 'Hello'
   * StringUtilsService.capitalize('world'); // Returns 'World'
   * StringUtilsService.capitalize('');      // Returns ''
   * ```
   *
   * @param str The string to be capitalized.
   * @returns The string with the first letter capitalized.
   */
  static readonly capitalize = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Converts a string to camelCase.
   *
   * This method will convert the given string to camelCase, where the first word is in lowercase and
   * subsequent words start with an uppercase letter. It handles spaces, hyphens, underscores, and dots.
   *
   * Example:
   * ```typescript
   * StringUtilsService.toCamelCase('hello world_example'); // Returns 'helloWorldExample'
   * ```
   *
   * @param str The string to be converted to camelCase.
   * @returns The camelCased string.
   */
  static readonly toCamelCase = (str: string): string => {
    return str
      .replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^[A-Z]/, (match) => match.toLowerCase());
  }

  /**
   * Converts a string to kebab-case.
   *
   * This method will convert the given string to kebab-case, where words are separated by hyphens and all letters are lowercase.
   * It handles spaces, camelCase, and PascalCase.
   *
   * Example:
   * ```typescript
   * StringUtilsService.toKebabCase('Hello World Example'); // Returns 'hello-world-example'
   * ```
   *
   * @param str The string to be converted to kebab-case.
   * @returns The kebab-cased string.
   */
  static readonly toKebabCase = (str: string): string => {
    return str
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/([a-z])([A-Z])/g, '$1-$2') // Replace camelCase with kebab-case
      .toLowerCase();
  }

  /**
   * Converts a string to snake_case.
   *
   * This method will convert the given string to snake_case, where words are separated by underscores and all letters are lowercase.
   * It handles spaces, camelCase, and PascalCase.
   *
   * Example:
   * ```typescript
   * StringUtilsService.toSnakeCase('Hello World Example'); // Returns 'hello_world_example'
   * ```
   *
   * @param str The string to be converted to snake_case.
   * @returns The snake_cased string.
   */
  static readonly toSnakeCase = (str: string): string => {
    return str
      .replace(/\s+/g, '_') // Replace spaces with _
      .replace(/([a-z])([A-Z])/g, '$1_$2') // Convert camelCase to snake_case
      .toLowerCase();
  }

  /**
   * Checks if the given string is a valid email address.
   *
   * This method uses a regular expression to determine if the given string conforms to a basic email format.
   *
   * Example:
   * ```typescript
   * StringUtilsService.isValidEmail('test@example.com'); // Returns true
   * StringUtilsService.isValidEmail('invalid-email');   // Returns false
   * ```
   *
   * @param str The string to be checked.
   * @returns `true` if the string is a valid email address, otherwise `false`.
   */
  static readonly isValidEmail = (str: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
  }

  /**
   * Trims leading and trailing spaces from the given string.
   *
   * This method removes any whitespace characters from the beginning and end of the string.
   *
   * Example:
   * ```typescript
   * StringUtilsService.trim('   hello   '); // Returns 'hello'
   * ```
   *
   * @param str The string to be trimmed.
   * @returns The trimmed string.
   */
  static readonly trim = (str: string): string => {
    return str.trim();
  }

  /**
   * Checks if the given string is empty or only contains spaces.
   *
   * This method determines if the string is either empty or contains only whitespace characters.
   *
   * Example:
   * ```typescript
   * StringUtilsService.isEmpty('');        // Returns true
   * StringUtilsService.isEmpty('   ');    // Returns true
   * StringUtilsService.isEmpty('hello');  // Returns false
   * ```
   *
   * @param str The string to be checked.
   * @returns `true` if the string is empty or contains only spaces, otherwise `false`.
   */
  static readonly isEmpty = (str: string): boolean => {
    return !str?.trim();
  }

  /**
   * Checks if the given string is not empty and contains non-whitespace characters.
   *
   * This method determines if the string is neither empty nor contains only whitespace characters.
   * It uses optional chaining to safely call `trim` if `str` is not `null` or `undefined`.
   *
   * Example:
   * ```typescript
   * StringUtilsService.isNotEmpty('hello');  // Returns true
   * StringUtilsService.isNotEmpty('   ');    // Returns false
   * StringUtilsService.isNotEmpty('');      // Returns false
   * ```
   *
   * @param str The string to be checked.
   * @returns `true` if the string is not empty and contains non-whitespace characters, otherwise `false`.
   */
  static readonly isNotEmpty = (str?: string): boolean => {
    return !!str?.trim();
  }

  /**
   * Replaces all occurrences of a substring with another string.
   *
   * This method replaces every instance of the specified substring in the string with a new string.
   *
   * Example:
   * ```typescript
   * StringUtilsService.replaceAll('hello world world', 'world', 'universe'); // Returns 'hello universe universe'
   * ```
   *
   * @param str The string where replacements will be made.
   * @param search The substring to be replaced.
   * @param replacement The string to replace the substring with.
   * @returns The string with all occurrences of the substring replaced.
   */
  static readonly replaceAll = (str: string, search: string, replacement: string): string => {
    return str.split(search).join(replacement);
  }

  /**
   * Counts the number of occurrences of a substring in the given string.
   *
   * This method counts how many times a specified substring appears in the string.
   *
   * Example:
   * ```typescript
   * StringUtilsService.countOccurrences('hello world world', 'world'); // Returns 2
   * ```
   *
   * @param str The string to be searched.
   * @param subStr The substring to count occurrences of.
   * @returns The number of occurrences of the substring.
   */
  static readonly countOccurrences = (str: string, subStr: string): number => {
    return (str.split(subStr).length - 1);
  }
}
