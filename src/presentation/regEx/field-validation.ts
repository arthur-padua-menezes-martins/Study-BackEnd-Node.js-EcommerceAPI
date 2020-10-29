import { IHttpRequestBody } from '../protocols/http'
import { IFieldValidationFieldsWithRegex, IFieldValidationWithRegex } from '../protocols/regEx/field-validation'

export class FieldValidationWithRegex implements IFieldValidationWithRegex {
  private readonly fieldValidationOptionsWithRegex: any = {}
  private readonly invalidFields: string[] = []

  constructor (fields: IFieldValidationFieldsWithRegex) {
    for (const key in fields) {
      this.fieldValidationOptionsWithRegex[key] = fields[key]
    }
  }

  options = async (field: string, value: string): Promise<string> => {
    if (field in this.fieldValidationOptionsWithRegex) {
      return (await this.fieldValidationOptionsWithRegex[field](value)) ? '' : field
    } else {
      return await Promise.resolve('')
    }
  }

  exec = async (fields: string[], body: IHttpRequestBody): Promise<string[]> => {
    for (const field of fields) {
      this.invalidFields.push(
        await this.options(field, body[field])
      )
    }

    return (
      (this.invalidFields.filter(field => field)).slice(0, this.invalidFields.length)
    )
  }
}
