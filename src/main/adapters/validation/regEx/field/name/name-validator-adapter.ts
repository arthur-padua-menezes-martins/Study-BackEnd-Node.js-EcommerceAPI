import { INameValidator } from '../../../../../../presentation/protocols/validation/field/fields/name-validation'

export class NameValidatorAdapter implements INameValidator {
  async isValid (value: string): Promise<boolean> {
    return await Promise.resolve(
      Boolean(value.match(/^[a-zA-Z\u00C0-\u017F´]+\s+[a-zA-Z\u00C0-\u017F´]{0,}$/))
    )
  }
}
