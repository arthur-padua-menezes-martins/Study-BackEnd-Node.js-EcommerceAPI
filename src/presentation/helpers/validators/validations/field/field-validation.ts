import {
  IHttpRequestBody
} from '../../import-all'
import {
  IFieldValidation,
  IFieldValidationOptions,
  IFieldValidationInputContent
} from '../../../../protocols/validation/field/export-all'

export class FieldValidation implements IFieldValidation {
  public readonly fieldValidationOptions: any = {}

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
  public async options (field: string, value: string): Promise<string> {
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
  public async exec (input: IFieldValidationInputContent): Promise<string[]> {
    const { fields, body } = input
    let invalidFields: string[] = []

    if (Array.isArray(body)) {
      invalidFields = await this.sequenceOfValidations(fields, body)
    } else {
      invalidFields = await this.anValidation(fields, body)
    }

    return (
      (invalidFields.filter(field => field)).slice(0, invalidFields.length)
    )
  }

  public async sequenceOfValidations (fields: string[], body: IHttpRequestBody, invalidFields: string[] = []) {
    for (const [index, field] of fields.entries()) {
      for (const item of field) {
        invalidFields.push(await this.options(item, body[index][item]))
      }
    }

    return invalidFields
  }

  public async anValidation (fields: string[], body: IHttpRequestBody, invalidFields: string[] = []): Promise<string[]> {
    for (const item of fields) {
      invalidFields.push(await this.options(item, body[item]))
    }

    return invalidFields
  }
}
