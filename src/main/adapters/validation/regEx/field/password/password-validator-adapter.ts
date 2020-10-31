import { IPasswordValidator } from '../../../../../../presentation/protocols/validation/field/fields/password-validation'

export class PasswordValidatorAdapter implements IPasswordValidator {
  async isValid (value: string): Promise<boolean> {
    return await Promise.resolve(
      Boolean(value.match(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*[\W_\x7B-\xFF]).{8,16}$/))
    )
  }
}
