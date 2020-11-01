"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = void 0;
/**
* the server took an expected action
* @param body
* specific content for each implementation
* @param successMessage
* success message
*/
exports.ok = (body, successMessage) => ({
    statusCode: 200,
    body: body,
    successMessage: successMessage
});
