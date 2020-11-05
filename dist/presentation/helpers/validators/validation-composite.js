"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationComposite {
    constructor(components) {
        this.types = ['validate fields', 'required fields', 'compare fields', 'verify types'];
        for (const component of components) {
            if (component.type === 'validate fields') {
                this.validateFields = component.content;
            }
            else if (component.type === 'required fields') {
                this.requiredFields = component.content;
            }
            else if (component.type === 'compare fields') {
                this.compareFields = component.content;
            }
            else if (component.type === 'verify types') {
                this.verifyTypes = component.content;
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