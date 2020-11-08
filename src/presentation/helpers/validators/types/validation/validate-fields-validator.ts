import { IValidation } from '../../../../protocols/validation/validation'
import { IHttpRequestBody } from '../../../../protocols/http/request/http-request-body'

interface IValidateFieldsValidatorParams {
  fields: string[]
  body: IHttpRequestBody
}
export class ValidateFieldsValidator implements IValidation {
  constructor (
    private readonly validator: any
  ) {}

  async validate (input: IValidateFieldsValidatorParams): Promise<string> {
    return this.validator.exec(input)
  }
}
