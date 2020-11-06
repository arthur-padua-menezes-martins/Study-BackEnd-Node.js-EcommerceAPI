import { IHttpRequestBody } from '../../../../protocols/http/request/http-request-body'
import { IValidation } from '../../../../protocols/validation/validation'

interface IRequiredFieldsValidatorParams {
  fields: string[]
  body: IHttpRequestBody
}
export class RequiredFieldsValidator implements IValidation {
  async validate (input: IRequiredFieldsValidatorParams): Promise<string[]> {
    const { fields, body } = input
    const missingFields: string[] = []

    if (fields.length > 0 && Object.keys(body).length > 0) {
      if (Array.isArray(body)) {
        for (const [index, field] of fields.entries()) {
          for (const item of field) {
            !(item in body[index]) && missingFields.push(item)
          }
        }
      } else {
        for (const item of fields) {
          !(item in body) && missingFields.push(item)
        }
      }
    } else if (fields.length > 0) {
      for (const item of fields) {
        missingFields.push(item)
      }
    } else if (Object.keys(body).length <= 0) {
      throw new Error()
    }

    return missingFields
  }
}
