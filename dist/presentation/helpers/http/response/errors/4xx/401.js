"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const import_all_1 = require("../../import-all");
/**
* the server cannot process the request due to the unauthorized error
*/
exports.unauthorized = () => ({
    statusCode: 401,
    body: {},
    errorMessage: new import_all_1.UnauthorizedError()
});
//# sourceMappingURL=401.js.map