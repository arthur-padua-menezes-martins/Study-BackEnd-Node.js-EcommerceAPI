import { IFieldsValidation } from '../import-all'

export class NameValidatorAdapter implements IFieldsValidation {
  async isValid (value: string): Promise<boolean> {
    return await Promise.resolve(
      Boolean(value.match(/^[a-zA-Z\u00C0-\u017F´]+\s+[a-zA-Z\u00C0-\u017F´]{0,}$/))
    )
  }
}
