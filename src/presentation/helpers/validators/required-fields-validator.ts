import { IHttpRequestBody } from '../../protocols/http/http-request-body'
import { Validation } from '../../protocols/validation/validation'

interface IInputContent {
  fields: string[]
  body: IHttpRequestBody
}
export class RequiredFieldsValidator implements Validation {
  async validate (input: IInputContent): Promise<string[]> {
    const { fields, body } = input
    const missingFields: string[] = []

    if (
      typeof fields !== 'undefined' && fields.length > 0 &&
      typeof body !== 'undefined' && Object.keys(body).length > 0
    ) {
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
    } else if (typeof fields !== 'undefined' && fields.length > 0) {
      for (const item of fields) {
        missingFields.push(item)
      }
    } else if (Object.keys(body).length <= 0) {
      throw new Error()
    }

    return missingFields
  }
}
