"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParamError = void 0;
class InvalidParamError extends Error {
    /**
    * @param invalidParameter
    * invalid parameter(s)
    * @this `this.name`
    * references the type of error
    */
    constructor(invalidParameter) {
        if (invalidParameter) {
            super(`correctly fill in the following field (s) ${invalidParameter}`);
        }
        else {
            super('complete all the fields correctly');
        }
        this.name = 'InvalidParamError';
    }
}
exports.InvalidParamError = InvalidParamError;
//# sourceMappingURL=invalid-param-error.js.map