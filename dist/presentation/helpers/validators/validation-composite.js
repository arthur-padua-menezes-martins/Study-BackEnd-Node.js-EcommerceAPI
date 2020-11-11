"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationComposite = void 0;
class ValidationComposite {
    constructor(components) {
        this.types = ['validate_fields', 'required_fields', 'compare_fields', 'verify_types'];
        for (const component of components) {
            if (component.type === 'validate_fields') {
                this.validateFields = component.content;
            }
            else if (component.type === 'required_fields') {
                this.requiredFields = component.content;
            }
            else if (component.type === 'compare_fields') {
                this.compareFields = component.content;
            }
            else if (component.type === 'verify_types') {
                this.verifyTypes = component.content;
            }
        }
    }
    async validate(input) {
        const { type } = input;
        if (type === 'validate_fields') {
            return this.validateFields.validate(input);
        }
        else if (type === 'required_fields') {
            return this.requiredFields.validate(input);
        }
        else if (type === 'compare_fields') {
            return this.compareFields.validate(input);
        }
        else if (type === 'verify_types') {
            return this.verifyTypes.validate(input);
        }
    }
}
exports.ValidationComposite = ValidationComposite;
//# sourceMappingURL=validation-composite.js.map