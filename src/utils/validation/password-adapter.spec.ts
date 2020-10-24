import { PasswordValidatorAdapter } from './password-adapter'
import { getSignUpHttpRequestBodyMatchField, getSignUpHttpRequestBodyNotMatchField } from '../../presentation/helpers/export-all'

interface IPasswordValidatorAdapterTypes {
  systemUnderTest: PasswordValidatorAdapter
}
const makeSystemUnderTest = async (): Promise<IPasswordValidatorAdapterTypes> => {
  const systemUnderTest = new PasswordValidatorAdapter()

  return {
    systemUnderTest
  }
}

describe('PasswordValidatorAdapter', () => {
  test('Should return false if validator returns false <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const isValid = await systemUnderTest.isValid(getSignUpHttpRequestBodyNotMatchField('password'))

    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const isValid = await systemUnderTest.isValid(getSignUpHttpRequestBodyMatchField('password'))

    expect(isValid).toBe(true)
  })
})
