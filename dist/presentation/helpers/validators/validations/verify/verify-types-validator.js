"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VerifyTypesValidator {
    constructor() {
        this.theTypeOfThisIsNotValid = [];
    }
    async validate(input) {
        const { checkTheTypeOfThis, checkThisType } = input;
        Object.keys(checkTheTypeOfThis).map((key) => {
            (typeof checkTheTypeOfThis[key] !== typeof checkThisType) &&
                this.theTypeOfThisIsNotValid.push(checkTheTypeOfThis);
        });
        return this.theTypeOfThisIsNotValid;
    }
}
exports.VerifyTypesValidator = VerifyTypesValidator;
//# sourceMappingURL=verify-types-validator.js.map