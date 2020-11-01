"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("../routes/authentication/login"));
exports.default = (app) => {
    const router = express_1.Router();
    login_1.default(router);
    app.use('/api', router);
};
