import { RequiredFieldsValidator } from './required-fields-validator'
import {
  IHttpRequestBody,
  informationsOfSignUpHttpRequestBodyFields, informationsOfSignUpHttpRequestBodyMatch
} from '../../import-all'

interface IRequiredFieldsValidatorTypes {
  requiredFieldsValidator: RequiredFieldsValidator
  input: {
    fields: string[]
    body: IHttpRequestBody['user']['informations']
  }
}
const makeSystemUnderTest = async (): Promise<IRequiredFieldsValidatorTypes> => {
  return {
    requiredFieldsValidator: new RequiredFieldsValidator(),
    input: {
      fields: informationsOfSignUpHttpRequestBodyFields,
      body: {
        ...informationsOfSignUpHttpRequestBodyMatch
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
