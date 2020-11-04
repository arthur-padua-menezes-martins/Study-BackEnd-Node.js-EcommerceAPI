import { IFieldsValidation } from '../import-all'

export class PasswordValidatorAdapter implements IFieldsValidation {
  async isValid (value: string): Promise<boolean> {
    return await Promise.resolve(
      Boolean(value.match(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*[\W_\x7B-\xFF]).{8,16}$/))
    )
  }
}
