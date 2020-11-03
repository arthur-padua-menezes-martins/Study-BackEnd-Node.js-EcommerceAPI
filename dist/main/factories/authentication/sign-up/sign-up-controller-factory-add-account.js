"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeAccount = void 0;
const db_write_add_account_1 = require("../../../../data/usecases/account/write/add-account/db-write-add-account");
const bcrypt_adapter_1 = require("../../../../infra/criptography/adapter/bcrypt/bcrypt-adapter");
const write_account_mongo_repository_1 = require("../../../../infra/db/mongodb/account/write/write-account-mongo-repository");
const encrypter = new bcrypt_adapter_1.BcryptAdapter(12);
const accountRepositoryWrite = new write_account_mongo_repository_1.AccountMongoRepositoryWrite();
exports.writeAccount = new db_write_add_account_1.DatabaseAddAccountController(encrypter, accountRepositoryWrite);
//# sourceMappingURL=sign-up-controller-factory-add-account.js.map