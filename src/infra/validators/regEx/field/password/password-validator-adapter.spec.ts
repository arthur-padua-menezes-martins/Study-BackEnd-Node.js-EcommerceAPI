import {
  PasswordValidatorAdapter
} from './password-validator-adapter'
import {
  informationsOfSignUpHttpRequest
} from '../import-all'

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
    const isValid = await systemUnderTest.isValid(informationsOfSignUpHttpRequest.getBodyNotMatch('password'))

    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const isValid = await systemUnderTest.isValid(informationsOfSignUpHttpRequest.getBodyMatch('password'))

    expect(isValid).toBe(true)
  })
})
