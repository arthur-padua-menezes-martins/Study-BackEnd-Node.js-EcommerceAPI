"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnauthorizedError extends Error {
    /**
    * @this `this.name`
    * references the type of error
    */
    constructor() {
        super('acesso não autorizado');
        this.name = 'UnauthorizedError';
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=unauthorized-error.js.map