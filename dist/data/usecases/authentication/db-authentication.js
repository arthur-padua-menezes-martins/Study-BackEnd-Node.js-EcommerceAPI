"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseAuthenticationController = void 0;
class DatabaseAuthenticationController {
    constructor(readAccount, hashComparer, encrypter, updateAccountRepository) {
        this.readAccount = readAccount;
        this.hashComparer = hashComparer;
        this.encrypter = encrypter;
        this.updateAccountRepository = updateAccountRepository;
    }
    async auth(authentication) {
        const account = await this.readAccount.searchByField({ email: authentication.email });
        if (account) {
            const isEqual = await this.hashComparer.compare(authentication.password, account.password);
            if (isEqual) {
                const accessToken = await this.encrypter.encrypt(account.id);
                await this.updateAccountRepository.updateAccessToken(account.id, accessToken);
                return accessToken;
            }
        }
        return null;
    }
}
exports.DatabaseAuthenticationController = DatabaseAuthenticationController;
//# sourceMappingURL=db-authentication.js.map