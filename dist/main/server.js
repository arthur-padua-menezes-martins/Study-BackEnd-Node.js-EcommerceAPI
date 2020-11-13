"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_helper_1 = require("../infra/db/mongo/driver/mongoose/helper/mongo-helper");
const env_1 = __importDefault(require("./config/env"));
mongo_helper_1.MongoHelper.connect(env_1.default.mongoUrl).then(async () => {
    const app = (await Promise.resolve().then(() => __importStar(require('./config/app')))).default;
    app.listen(env_1.default.port, () => {
        console.log(`server available at localhost: ${env_1.default.port}`);
    });
}).catch(console.error);
//# sourceMappingURL=server.js.map