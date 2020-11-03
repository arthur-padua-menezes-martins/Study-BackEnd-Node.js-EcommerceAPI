"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badRequest = void 0;
/**
* the server cannot or will not process the request due to client error
* @param body
* specific content for each implementation
* @param successMessage
* success message
* @param errorMessage
* error message
* @param invalidFields
* invalid fields which caused the function to be invoked
*/
exports.badRequest = (body = {}, successMessage, errorMessage, invalidFields) => ({
    statusCode: 400,
    body: body,
    successMessage: successMessage,
    errorMessage: errorMessage,
    invalidFields: invalidFields
});
//# sourceMappingURL=400.js.map