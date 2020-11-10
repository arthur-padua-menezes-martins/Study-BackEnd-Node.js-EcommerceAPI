"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_routes_1 = __importDefault(require("../routes/authentication/authentication-routes"));
const survey_routes_1 = __importDefault(require("../routes/administrator/survey/survey-routes"));
exports.default = (app) => {
    const router = express_1.Router();
    authentication_routes_1.default(router);
    survey_routes_1.default(router);
    app.use('/api', router);
};
//# sourceMappingURL=routes.js.map