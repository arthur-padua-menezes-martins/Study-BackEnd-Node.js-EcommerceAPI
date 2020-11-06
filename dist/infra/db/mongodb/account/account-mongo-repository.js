"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMongoRepository = void 0;
const export_all_1 = require("./export-all");
const import_all_1 = require("./import-all");
class AccountMongoRepository {
}
exports.AccountMongoRepository = AccountMongoRepository;
import_all_1.applyMixins(AccountMongoRepository, [
    export_all_1.AccountMongoRepositoryWrite,
    export_all_1.AccountMongoRepositoryRead,
    export_all_1.AccountMongoRepositoryUpdate
]);
//# sourceMappingURL=account-mongo-repository.js.map