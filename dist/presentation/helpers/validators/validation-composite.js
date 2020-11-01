"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationComposite = void 0;
class ValidationComposite {
    constructor(validationComponents) {
        for (const validationComponent of validationComponents) {
            if (validationComponent.type === 'validate fields') {
                this.validateFields = validationComponent.content;
            }
            else if (validationComponent.type === 'required fields') {
                this.requiredFields = validationComponent.content;
            }
            else if (validationComponent.type === 'compare fields') {
                this.compareFields = validationComponent.content;
            }
            else if (validationComponent.type === 'verify types') {
                this.verifyTypes = validationComponent.content;
            }
        }
    }
    async validate(input) {
        const { type } = input;
        if (type === 'validate fields') {
            return this.validateFields.validate(input);
        }
        else if (type === 'required fields') {
            return this.requiredFields.validate(input);
        }
        else if (type === 'compare fields') {
            return this.compareFields.validate(input);
        }
        else if (type === 'verify types') {
            return this.verifyTypes.validate(input);
        }
    }
}
exports.ValidationComposite = ValidationComposite;
//# sourceMappingURL=validation-composite.js.map