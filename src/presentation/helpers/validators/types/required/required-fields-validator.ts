import { IHttpRequestBody } from '../../../../protocols/http/request/http-request-body'
import { IValidation } from '../../../../protocols/validation/validation'

interface IRequiredFieldsValidatorParams {
  fields: string[]
  body: IHttpRequestBody['user']['informations'] | IHttpRequestBody['survey']
}
export class RequiredFieldsValidator implements IValidation {
  public async validate (input: IRequiredFieldsValidatorParams): Promise<string[]> {
    const { fields, body } = input
    const missingFields: string[] = []
    /*
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
    */

    if (
      (RequiredFieldsValidator.verifyIfTheFieldsLengthIsGreaterThatZero(fields)) &&
      (RequiredFieldsValidator.verifyIfTheBodyLengthIsGreaterThanZero(body))
    ) {
      if (Array.isArray(body)) {
        for (const [index, field] of fields.entries()) {
          for (const item of field) {
            !(item in body[index]) && missingFields.push(item)
          }
        }
      } else if (RequiredFieldsValidator.verifyIfTheBodyIsAnObject(body)) {
        for (const item of fields) {
          if (!(item in body) || (body[item] === undefined)) {
            missingFields.push(item)
          }
        }
      }
    } else if (RequiredFieldsValidator.verifyIfTheFieldsLengthIsGreaterThatZero(fields)) {
      for (const item of fields) {
        missingFields.push(item)
      }
    } else if (!(RequiredFieldsValidator.verifyIfTheBodyLengthIsGreaterThanZero(body))) {
      throw new Error()
    }

    return missingFields
  }

  static verifyIfTheFieldsLengthIsGreaterThatZero (fields: IRequiredFieldsValidatorParams['fields']) {
    return fields.length > 0
  }

  static verifyIfTheBodyLengthIsGreaterThanZero (body: IRequiredFieldsValidatorParams['body']) {
    return Object.keys(body).length > 0
  }

  static verifyIfTheBodyIsAnArray (body: IRequiredFieldsValidatorParams['body']) {
    return Array.isArray(body)
  }

  static verifyIfTheBodyIsAnObject (body: IRequiredFieldsValidatorParams['body']) {
    return typeof body === 'object'
  }
}
