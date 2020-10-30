import { PasswordValidatorWithRegex } from '../../presentation/protocols/regEx/password-validation'

export class PasswordValidatorAdapter implements PasswordValidatorWithRegex {
  async isValid (value: string): Promise<boolean> {
    return await Promise.resolve(
      Boolean(value.match(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*[\W_\x7B-\xFF]).{8,16}$/))
    )
  }
}
