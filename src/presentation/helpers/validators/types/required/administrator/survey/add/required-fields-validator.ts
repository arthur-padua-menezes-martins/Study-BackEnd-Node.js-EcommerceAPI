import {
  SuperClassRequiredFieldsValidator
} from '../../../super/super-class-validator'
import {
  IHttpRequestBody
} from '../../../../../../../protocols/http/request/http-request-body'
import {
  IValidation
} from '../../../../../../../protocols/validation/validation'

interface IRequiredFieldsValidatorParams {
  fields: string[]
  body: IHttpRequestBody['survey']
}
export class RequiredFieldsValidator extends SuperClassRequiredFieldsValidator implements IValidation {
  public async validate (input: IRequiredFieldsValidatorParams): Promise<string[]> {
    const { fields, body } = input
    const [survey, answers] = [fields.slice(0, 2), fields.slice(2, 4)]
    const missingFields: string[] = []

    if (RequiredFieldsValidator.verifyIfTheFieldsLengthIsGreaterThatZero(fields)) {
      if (
        (RequiredFieldsValidator.verifyIfTheBodyIsAnObject(body)) &&
        (RequiredFieldsValidator.verifyIfTheBodyLengthIsGreaterThanZero(body))
      ) {
        for (const item of survey) {
          if (!(item in body) || !(body[item])) {
            missingFields.push(item)
          }
        }
        for (const item of answers) {
          for (const [index] of Object.entries(body.answers)) {
            if (
              !(item in (body.answers[index as any])) ||
              !(body.answers[index as any][item])
            ) {
              missingFields.push(item)
            }
          }
        }
      } else {
        for (const item of survey) {
          missingFields.push(item)
        }
      }
    } else if (!(RequiredFieldsValidator.verifyIfTheBodyLengthIsGreaterThanZero(body))) {
      throw new Error()
    }

    return missingFields
  }
}
