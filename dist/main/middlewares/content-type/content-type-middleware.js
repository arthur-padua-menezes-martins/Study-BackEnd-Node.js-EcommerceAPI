"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultContentType = (req, res, next) => {
    res.type('application/json');
    next();
};
//# sourceMappingURL=content-type-middleware.js.map