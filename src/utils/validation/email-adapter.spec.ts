import { EmailValidatorAdapter } from './email-adapter'
import { getHttpRequestBodyMatchField, getHttpRequestBodyNotMatchField } from '../../presentation/helpers/export-all'

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
    jest.spyOn(systemUnderTest, 'isValid').mockReturnValueOnce(Promise.resolve(false))
    const isValid = await systemUnderTest.isValid(getHttpRequestBodyNotMatchField('email'))

    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    jest.spyOn(systemUnderTest, 'isValid').mockReturnValueOnce(Promise.resolve(true))
    const isValid = await systemUnderTest.isValid(getHttpRequestBodyMatchField('email'))

    expect(isValid).toBe(true)
  })
})
