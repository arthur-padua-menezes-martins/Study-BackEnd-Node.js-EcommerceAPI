"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMongoRepository = void 0;
const log_error_mongo_repository_1 = require("./error/log-error-mongo-repository");
const import_all_1 = require("./import-all");
class LogMongoRepository {
}
exports.LogMongoRepository = LogMongoRepository;
import_all_1.applyMixins(LogMongoRepository, [
    log_error_mongo_repository_1.LogErrorMongoRepository
]);
//# sourceMappingURL=log-mongo-repository.js.map