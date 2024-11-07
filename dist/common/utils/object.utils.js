"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectUtils = void 0;
class ObjectUtils {
}
exports.ObjectUtils = ObjectUtils;
ObjectUtils.isEmpty = (obj) => {
    return obj == null || (typeof obj === 'object' && Object.keys(obj).length === 0);
};
ObjectUtils.isNotEmpty = (obj) => {
    return !ObjectUtils.isEmpty(obj);
};
//# sourceMappingURL=object.utils.js.map