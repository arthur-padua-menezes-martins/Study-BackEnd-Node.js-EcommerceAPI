import { Validation } from './validation'
import { IHttpRequestBody } from '../../protocols/http'

interface IInputContent {
  fields: string[]
  body: IHttpRequestBody
}
export class ValidateFieldsValidator implements Validation {
  private readonly validator: any

  constructor (validator: any) {
    this.validator = validator
  }

  async validate (input: IInputContent): Promise<string> {
    return this.validator.exec(input)
  }
}
