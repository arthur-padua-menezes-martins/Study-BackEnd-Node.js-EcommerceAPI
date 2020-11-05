import { IFieldValidation, IFieldValidationOptions, IFieldValidationInputContent } from '../../../../protocols/validation/field/export-all'

export class FieldValidationWithRegEx implements IFieldValidation {
  public readonly fieldValidationOptions: any = {}
  public readonly invalidFields: string[] = []

  constructor (options: IFieldValidationOptions) {
    for (const key in options) {
      this.fieldValidationOptions[key] = options[key]
    }
  }

  /**
  * @param field
  * the field that activates the validation
  * @param value
  * the value for validation
  */
  async options (field: string, value: string): Promise<string> {
    if (field in this.fieldValidationOptions) {
      return (await this.fieldValidationOptions[field](value)) ? '' : field
    } else {
      return await Promise.resolve('')
    }
  }

  /**
  * @param input
  * the fields and the body to pass an validation
  */
  async exec (input: IFieldValidationInputContent): Promise<string[]> {
    const { fields, body } = input

    if (Array.isArray(body)) {
      for (const [index, field] of fields.entries()) {
        for (const item of field) {
          this.invalidFields.push(await this.options(item, body[index][item]))
        }
      }
    } else {
      for (const item of fields) {
        this.invalidFields.push(await this.options(item, body[item]))
      }
    }

    return (
      (this.invalidFields.filter(field => field)).slice(0, this.invalidFields.length)
    )
  }
}
