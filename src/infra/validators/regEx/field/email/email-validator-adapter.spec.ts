import {
  EmailValidatorAdapter
} from './email-validator-adapter'
import {
  informationsOfSignUpHttpRequest
} from '../import-all'

interface IEmailValidatorAdapterTypes {
  systemUnderTest: EmailValidatorAdapter
}
const makeSystemUnderTest = async (): Promise<IEmailValidatorAdapterTypes> => {
  const systemUnderTest = new EmailValidatorAdapter()

  return {
    systemUnderTest
  }
}

describe('EmailValidatorAdapter', () => {
  test('Should return false if validator returns false <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const isValid = await systemUnderTest.isValid(informationsOfSignUpHttpRequest.getBodyNotMatch('email'))

    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const isValid = await systemUnderTest.isValid(informationsOfSignUpHttpRequest.getBodyMatch('email'))

    expect(isValid).toBe(true)
  })
})
