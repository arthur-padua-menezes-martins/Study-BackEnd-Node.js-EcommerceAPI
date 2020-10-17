import { NameValidatorWithRegex } from '../../presentation/regExp/name-validation'

export class NameValidatorAdapter implements NameValidatorWithRegex {
  async isValid (value: string): Promise<boolean> {
    return await Promise.resolve(
      Boolean(value.match(/^[a-zA-Z\u00C0-\u017F´]+\s+[a-zA-Z\u00C0-\u017F´]{0,}$/))
    )
  }
}
