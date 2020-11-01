"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const export_all_1 = require("../../../../presentation/helpers/validators/export-all");
const export_all_2 = require("../../../adapters/validation/regEx/field/export-all");
const makeFieldValidationWithRegEx = () => {
    return new export_all_1.FieldValidationWithRegEx({
        email: (new export_all_2.EmailValidatorAdapter()).isValid,
        password: (new export_all_2.PasswordValidatorAdapter()).isValid
    });
};
exports.validation = new export_all_1.ValidationComposite([
    { content: new export_all_1.CompareFieldsValidator(), type: 'compare fields' },
    { content: new export_all_1.RequiredFieldsValidator(), type: 'required fields' },
    { content: new export_all_1.ValidateFieldsValidator(makeFieldValidationWithRegEx()), type: 'validate fields' },
    { content: new export_all_1.VerifyTypesValidator(), type: 'verify types' }
]);
//# sourceMappingURL=sign-in-controller-factory-validation.js.map