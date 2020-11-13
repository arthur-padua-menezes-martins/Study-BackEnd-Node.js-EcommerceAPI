"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MissingParamError extends Error {
    /**
    * @param missingParameter
    * missing parameter(s)
    * @this `this.name`
    * references the type of error
    */
    constructor(missingParameter) {
        if (missingParameter) {
            super(`correctly fill in the field (s) ${missingParameter}`);
        }
        else {
            super('fill out all the fields');
        }
        this.name = 'MissingParamError';
    }
}
exports.MissingParamError = MissingParamError;
//# sourceMappingURL=missin-param-error.js.map