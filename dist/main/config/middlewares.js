"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const export_all_1 = require("../middlewares/export-all");
const cors_middleware_1 = __importDefault(require("../middlewares/cors/cors-middleware"));
exports.default = (app) => {
    app.use(export_all_1.corsAccessControl);
    app.use(cors_middleware_1.default);
    app.use(export_all_1.bodyParser);
    app.use(export_all_1.defaultContentType);
};
//# sourceMappingURL=middlewares.js.map