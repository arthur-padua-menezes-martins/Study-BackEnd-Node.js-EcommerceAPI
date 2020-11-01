"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseAddAccountController = void 0;
class DatabaseAddAccountController {
    constructor(hasher, addAccountRepository) {
        this.hasher = hasher;
        this.addAccountRepository = addAccountRepository;
    }
    async add(accountData) {
        const encryptedPassword = await this.hasher.hash(accountData.password);
        const account = await this.addAccountRepository.add(Object.assign(Object.assign({}, accountData), { password: encryptedPassword }));
        return await Promise.resolve(account);
    }
}
exports.DatabaseAddAccountController = DatabaseAddAccountController;
