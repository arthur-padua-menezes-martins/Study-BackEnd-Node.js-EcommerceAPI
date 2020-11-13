"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
* @implements {IHasher}
*
* @method ``hash``
* encrypts specific content for each implementation
*/
class BcryptAdapter {
    /**
    * @param salt
    * number of randomizations
    */
    constructor(salt) {
        this.salt = salt;
    }
    /**
    * @param value
    * value to encrypt
    * @returns
    * encrypted value
    */
    async hash(value) {
        return await Promise.resolve(await bcrypt_1.default.hash(value, this.salt));
    }
    async compare(value, hash) {
        const isEqual = await bcrypt_1.default.compare(value, hash);
        return await Promise.resolve(isEqual);
    }
}
exports.BcryptAdapter = BcryptAdapter;
//# sourceMappingURL=bcrypt-adapter.js.map