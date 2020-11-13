import {
  SuperClassRequiredFieldsValidator
} from '../../super/super-class-validator'
import {
  IHttpRequestBody
} from '../../../../../../protocols/http/request/http-request-body'
import {
  IValidation
} from '../../../../../../protocols/validation/validation'

interface IRequiredFieldsValidatorParams {
  fields: string[]
  body: IHttpRequestBody['user']['informations']['personal'] | IHttpRequestBody['user']['informations']['address']
}
export class RequiredFieldsValidator extends SuperClassRequiredFieldsValidator implements IValidation {
  public async validate (input: IRequiredFieldsValidatorParams): Promise<string[]> {
    const { fields, body } = input
    const missingFields: string[] = []

    if (RequiredFieldsValidator.verifyIfTheFieldsLengthIsGreaterThatZero(fields)) {
      if ((RequiredFieldsValidator.verifyIfTheBodyIsAnObject(body)) && (RequiredFieldsValidator.verifyIfTheBodyLengthIsGreaterThanZero(body))) {
        for (const item of fields) {
          if (!(item in body) || !(body[item])) {
            missingFields.push(item)
          }
        }
      } else {
        for (const item of fields) {
          missingFields.push(item)
        }
      }
    } else if (!(RequiredFieldsValidator.verifyIfTheBodyLengthIsGreaterThanZero(body))) {
      throw new Error()
    }

    return missingFields
  }
}
