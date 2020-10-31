import { Validation } from '../../protocols/validation/validation'
import { IHttpRequestBody } from '../../protocols/http/http-request-body'

interface IInputContent {
  fields: string[]
  body: IHttpRequestBody
}
export class ValidateFieldsValidator implements Validation {
  constructor (
    private readonly validator: any
  ) {}

  async validate (input: IInputContent): Promise<string> {
    return this.validator.exec(input)
  }
}
