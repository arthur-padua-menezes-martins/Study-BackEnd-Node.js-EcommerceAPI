import { NameValidatorAdapter } from './name-adapter'
import { getHttpRequestBodyMatchField, getHttpRequestBodyNotMatchField } from '../../presentation/helpers/export-all'

interface INameValidatorAdapterTypes {
  systemUnderTest: NameValidatorAdapter
}
const makeSignUpController = async (): Promise<INameValidatorAdapterTypes> => {
  const systemUnderTest = new NameValidatorAdapter()

  return {
    systemUnderTest
  }
}

describe('NameValidatorAdapter', () => {
  test('Should return false if validator returns false <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSignUpController()
    jest.spyOn(systemUnderTest, 'isValid').mockReturnValueOnce(Promise.resolve(false))
    const isValid = await systemUnderTest.isValid(getHttpRequestBodyNotMatchField('name'))

    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSignUpController()
    jest.spyOn(systemUnderTest, 'isValid').mockReturnValueOnce(Promise.resolve(true))
    const isValid = await systemUnderTest.isValid(getHttpRequestBodyMatchField('name'))

    expect(isValid).toBe(true)
  })
})
