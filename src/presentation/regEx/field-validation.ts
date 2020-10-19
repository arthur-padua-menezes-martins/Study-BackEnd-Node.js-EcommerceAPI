import { IFieldValidationFieldsWithRegex, IFieldValidationWithRegex } from '../protocols/regEx/field-validation'

export class FieldValidationWithRegex implements IFieldValidationWithRegex {
  private readonly fieldValidationOptionsWithRegex: any = {}

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
}
