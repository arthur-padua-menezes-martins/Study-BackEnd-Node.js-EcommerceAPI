import { PasswordValidatorAdapter } from './password-adapter'
import { getHttpRequestBodyMatchField, getHttpRequestBodyNotMatchField } from '../../presentation/helpers/export-all'

interface IPasswordValidatorAdapterTypes {
  systemUnderTest: PasswordValidatorAdapter
}
const makeSignUpController = async (): Promise<IPasswordValidatorAdapterTypes> => {
  const systemUnderTest = new PasswordValidatorAdapter()

  return {
    systemUnderTest
  }
}

describe('PasswordValidatorAdapter', () => {
  test('Should return false if validator returns false <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSignUpController()
    jest.spyOn(systemUnderTest, 'isValid').mockReturnValueOnce(Promise.resolve(false))
    const isValid = await systemUnderTest.isValid(getHttpRequestBodyNotMatchField('password'))

    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSignUpController()
    jest.spyOn(systemUnderTest, 'isValid').mockReturnValueOnce(Promise.resolve(true))
    const isValid = await systemUnderTest.isValid(getHttpRequestBodyMatchField('password'))

    expect(isValid).toBe(true)
  })
})
