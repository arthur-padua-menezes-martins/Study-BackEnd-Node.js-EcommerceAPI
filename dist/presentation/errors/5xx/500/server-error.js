"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
class ServerError extends Error {
    /**
    * @param errorStack
    * error stack
    * @this `this.name`
    * references the type of error
    * @this `this.message`
    * references a generic error message
    * @this `this.stack`
    * references a errorStack
    */
    constructor(errorStack) {
        super('um problema afetou o funcionamento do servidor, tente novamente em breve!');
        this.name = 'ServerError';
        this.stack = errorStack;
    }
}
exports.ServerError = ServerError;
