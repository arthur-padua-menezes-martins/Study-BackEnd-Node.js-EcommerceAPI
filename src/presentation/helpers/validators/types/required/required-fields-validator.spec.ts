import {
  RequiredFieldsValidator
} from './user/authentication/required-fields-validator'
import {
  IHttpRequestBody,
  informationsOfSignUpHttpRequest
} from '../../import-all'

interface IRequiredFieldsValidatorTypes {
  requiredFieldsValidator: RequiredFieldsValidator
  input: {
    fields: string[]
    body: IHttpRequestBody['user']['informations']['personal'] | IHttpRequestBody['user']['informations']['address']
  }
}
const makeSystemUnderTest = async (): Promise<IRequiredFieldsValidatorTypes> => {
  return {
    requiredFieldsValidator: new RequiredFieldsValidator(),
    input: {
      fields: informationsOfSignUpHttpRequest.bodyFields,
      body: {
        ...informationsOfSignUpHttpRequest.bodyMatch.personal,
        ...informationsOfSignUpHttpRequest.bodyMatch.address
      }
    }
  }
}

describe('RequiredFieldsValidator', () => {
  test('returns error if validation throws <version: 0.0.1>', async () => {
    const { requiredFieldsValidator, input } = await makeSystemUnderTest()

    jest.spyOn(requiredFieldsValidator, 'validate').mockImplementationOnce(async () => {
      throw new Error()
    })

    await expect(requiredFieldsValidator.validate(input)).rejects.toThrow()
  })
})
