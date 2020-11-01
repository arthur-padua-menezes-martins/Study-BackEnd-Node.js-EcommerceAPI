"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultContentType = void 0;
exports.defaultContentType = (req, res, next) => {
    res.type('application/json');
    next();
};
