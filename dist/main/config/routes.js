"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sign_up_and_sign_in_1 = __importDefault(require("../routes/authentication/sign-up-and-sign-in"));
exports.default = (app) => {
    const router = express_1.Router();
    sign_up_and_sign_in_1.default(router);
    app.use('/api', router);
};
//# sourceMappingURL=routes.js.map