"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseAuthenticationController = void 0;
class DatabaseAuthenticationController {
    constructor(searchAccountByEmailRepository, hashComparer, encrypter, updateAccessTokenRepository) {
        this.searchAccountByEmailRepository = searchAccountByEmailRepository;
        this.hashComparer = hashComparer;
        this.encrypter = encrypter;
        this.updateAccessTokenRepository = updateAccessTokenRepository;
    }
    async auth(authentication) {
        const account = await this.searchAccountByEmailRepository.searchByEmail(authentication.email);
        if (account) {
            const isEqual = await this.hashComparer.compare(authentication.password, account.password);
            if (isEqual) {
                const accessToken = await this.encrypter.encrypt(account.id);
                await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken);
                return accessToken;
            }
        }
        return null;
    }
}
exports.DatabaseAuthenticationController = DatabaseAuthenticationController;
//# sourceMappingURL=db-authentication.js.map