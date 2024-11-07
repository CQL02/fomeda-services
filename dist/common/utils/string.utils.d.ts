export declare class StringUtils {
    static readonly capitalize: (str: string) => string;
    static readonly toCamelCase: (str: string) => string;
    static readonly toKebabCase: (str: string) => string;
    static readonly toSnakeCase: (str: string) => string;
    static readonly isValidEmail: (str: string) => boolean;
    static readonly trim: (str: string) => string;
    static readonly isEmpty: (str: string) => boolean;
    static readonly isNotEmpty: (str?: string) => boolean;
    static readonly replaceAll: (str: string, search: string, replacement: string) => string;
    static readonly countOccurrences: (str: string, subStr: string) => number;
}
