import { EmailValidatorAdapter } from './email-adapter'
import { getHttpRequestBodyNotMatchField } from '../../presentation/helpers/export-all'

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false <version: 0.0.1>', async () => {
    const systemUnderTest = new EmailValidatorAdapter()
    const isValid = await systemUnderTest.email(getHttpRequestBodyNotMatchField('email'))

    expect(isValid).toBe(false)
  })
})
