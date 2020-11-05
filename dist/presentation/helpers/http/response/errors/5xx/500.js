"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const import_all_1 = require("../../import-all");
/**
* the server cannot or will not process the request due to a server error
* @param error
* error thrown
*/
exports.serverError = (error) => ({
    statusCode: 500,
    body: {},
    errorMessage: new import_all_1.ServerError(error.stack)
});
//# sourceMappingURL=500.js.map