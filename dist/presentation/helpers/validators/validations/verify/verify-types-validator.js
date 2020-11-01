"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyTypesValidator = void 0;
class VerifyTypesValidator {
    async validate(input) {
        const { checkThisType, checkTheTypeOfThis } = input;
        return Object.keys(checkTheTypeOfThis).map((key) => {
            return typeof checkTheTypeOfThis[key] === typeof checkThisType;
        });
    }
}
exports.VerifyTypesValidator = VerifyTypesValidator;
//# sourceMappingURL=verify-types-validator.js.map