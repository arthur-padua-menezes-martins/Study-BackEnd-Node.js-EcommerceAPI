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
  test('returns error if validation throws <version: 0.0.1>', async () => {
    const { compareFieldsValidator, input } = await makeSystemUnderTest()

    jest.spyOn(compareFieldsValidator, 'validate').mockImplementationOnce(async () => {
      throw new Error()
    })

    await expect(compareFieldsValidator.validate(input)).rejects.toThrow()
  })

  test('should call validation with correct values <version: 0.0.1>', async () => {
    const { compareFieldsValidator, input } = await makeSystemUnderTest()

    const spyOnValidate = jest.spyOn(compareFieldsValidator, 'validate')

    await compareFieldsValidator.validate(input)
    expect(spyOnValidate).toHaveBeenCalledWith(input)
  })

  test('returns an not empty if validation fails <version: 0.0.1>', async () => {
    const { compareFieldsValidator, input } = await makeSystemUnderTest()

    expect(await compareFieldsValidator.validate({
      ...input, withThis: 'another_value'
    })).toEqual([''])
  })

  test('returns an empty array if validation success <version: 0.0.1>', async () => {
    const { compareFieldsValidator, input } = await makeSystemUnderTest()

    expect(await compareFieldsValidator.validate(input)).toEqual([])
  })
})
