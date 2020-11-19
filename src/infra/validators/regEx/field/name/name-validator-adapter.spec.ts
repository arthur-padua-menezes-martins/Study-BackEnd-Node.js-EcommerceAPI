import {
  NameValidatorAdapter
} from './name-validator-adapter'
import {
  informationsOfSignUpHttpRequest
} from '../import-all'

interface INameValidatorAdapterTypes {
  systemUnderTest: NameValidatorAdapter
}
const makeSystemUnderTest = async (): Promise<INameValidatorAdapterTypes> => {
  const systemUnderTest = new NameValidatorAdapter()

  return {
    systemUnderTest
  }
}

describe('NameValidatorAdapter', () => {
  test('Should return false if validator returns false <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const isValid = await systemUnderTest.isValid(informationsOfSignUpHttpRequest.getBodyNotMatch('name'))

    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const isValid = await systemUnderTest.isValid(informationsOfSignUpHttpRequest.getBodyMatch('name'))

    expect(isValid).toBe(true)
  })
})
