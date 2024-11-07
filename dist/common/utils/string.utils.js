"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
class StringUtils {
}
exports.StringUtils = StringUtils;
StringUtils.capitalize = (str) => {
    if (!str)
        return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};
StringUtils.toCamelCase = (str) => {
    return str
        .replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
        .replace(/^[A-Z]/, (match) => match.toLowerCase());
};
StringUtils.toKebabCase = (str) => {
    return str
        .replace(/\s+/g, '-')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase();
};
StringUtils.toSnakeCase = (str) => {
    return str
        .replace(/\s+/g, '_')
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .toLowerCase();
};
StringUtils.isValidEmail = (str) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
};
StringUtils.trim = (str) => {
    return str.trim();
};
StringUtils.isEmpty = (str) => {
    return !str?.trim();
};
StringUtils.isNotEmpty = (str) => {
    return !!str?.trim();
};
StringUtils.replaceAll = (str, search, replacement) => {
    return str.split(search).join(replacement);
};
StringUtils.countOccurrences = (str, subStr) => {
    return (str.split(subStr).length - 1);
};
//# sourceMappingURL=string.utils.js.map