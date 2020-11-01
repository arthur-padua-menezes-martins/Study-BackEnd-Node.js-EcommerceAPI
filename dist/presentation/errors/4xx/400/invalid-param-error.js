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
        if (typeof invalidParameter !== 'undefined' && invalidParameter !== '') {
            super(`preencha corretamente o(s) seguinte(s) campo(s) ${invalidParameter}`);
        }
        else {
            super('preencha todos os campos corretamente');
        }
        this.name = 'InvalidParamError';
    }
}
exports.InvalidParamError = InvalidParamError;
