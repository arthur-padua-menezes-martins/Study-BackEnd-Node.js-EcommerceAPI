import { CompareFieldsValidator } from './compare-fields-validator'

interface ICompareFieldsValidatorTypes {
  compareFieldsValidator: CompareFieldsValidator
  input: {
    checkThis: any
    withThis: any
  }
}
const makeSystemUnderTest = async (): Promise<ICompareFieldsValidatorTypes> => {
  return {
    compareFieldsValidator: new CompareFieldsValidator(),
    input: {
      checkThis: 'any_value',
      withThis: 'any_value'
    }
  }
}

describe('CompareFieldsValidator', () => {
  test('', async () => {
    const { compareFieldsValidator, input } = await makeSystemUnderTest()

    jest.spyOn(compareFieldsValidator, 'validate').mockReturnValue(Promise.resolve(new Error()))

    expect((await compareFieldsValidator.validate(input)) instanceof Error).toBe(true)
  })

  test('returns true if validation success <version: 0.0.1>', async () => {
    const { compareFieldsValidator, input } = await makeSystemUnderTest()

    expect(await compareFieldsValidator.validate(input)).toBe(true)
  })

  test('returns false if validation fails <version: 0.0.1>', async () => {
    const { compareFieldsValidator, input } = await makeSystemUnderTest()

    jest.spyOn(compareFieldsValidator, 'validate').mockReturnValue(Promise.resolve(false))

    expect(await compareFieldsValidator.validate(
      Object.assign({}, { ...input, withThis: 'another_value' })
    )).toBe(false)
  })
})
