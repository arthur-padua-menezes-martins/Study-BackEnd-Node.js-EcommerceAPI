import { RequiredFieldsValidator } from './required-fields-validator'
import { IHttpRequestBody } from '../../protocols/http'

interface IRequiredFieldsValidatorTypes {
  requiredFieldsValidator: RequiredFieldsValidator
  input: {
    fields: string[]
    body: IHttpRequestBody
  }
}
const makeSystemUnderTest = async (): Promise<IRequiredFieldsValidatorTypes> => {
  return {
    requiredFieldsValidator: new RequiredFieldsValidator(),
    input: {
      fields: [''],
      body: {}
    }
  }
}

describe('RequiredFieldsValidator', () => {
  test('returns error if an error was thrown <version: 0.0.1>', async () => {
    const { requiredFieldsValidator, input } = await makeSystemUnderTest()

    jest.spyOn(requiredFieldsValidator, 'validate').mockReturnValue(Promise.reject(new Error()))

    expect(typeof requiredFieldsValidator.validate(input)).toEqual(typeof new Error())
  })

  test('returns invalid fields if any <version: 0.0.1>', async () => {
    const { requiredFieldsValidator, input } = await makeSystemUnderTest()

    expect(await requiredFieldsValidator.validate(
      Object.assign({}, { ...input, fields: ['email', 'password'] })
    )).toEqual(['email', 'password'])
  })
})
