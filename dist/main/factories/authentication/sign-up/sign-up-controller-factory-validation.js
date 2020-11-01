"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = exports.makeFieldValidationWithRegex = void 0;
const export_all_1 = require("../../../../presentation/helpers/validators/export-all");
const field_validation_with_reg_ex_1 = require("../../../../presentation/helpers/validators/regEx/field/field-validation-with-reg-ex");
const export_all_2 = require("../../../adapters/validation/regEx/field/export-all");
exports.makeFieldValidationWithRegex = () => {
    return new field_validation_with_reg_ex_1.FieldValidationWithRegEx({
        name: (new export_all_2.NameValidatorAdapter()).isValid,
        email: (new export_all_2.EmailValidatorAdapter()).isValid,
        password: (new export_all_2.PasswordValidatorAdapter()).isValid
    });
};
exports.validation = new export_all_1.ValidationComposite([
    { content: new export_all_1.ValidateFieldsValidator(exports.makeFieldValidationWithRegex()), type: 'validate fields' },
    { content: new export_all_1.RequiredFieldsValidator(), type: 'required fields' },
    { content: new export_all_1.VerifyTypesValidator(), type: 'verify types' },
    { content: new export_all_1.CompareFieldsValidator(), type: 'compare fields' }
]);
