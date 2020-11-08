import { IValidation } from '../../../../protocols/validation/validation'

interface ICompareFieldsValidatorParams {
  checkThis: string
  withThis: string
}
export class CompareFieldsValidator implements IValidation {
  private readonly thisIsNotEqual: string[] = []

  async validate (input: ICompareFieldsValidatorParams): Promise<any> {
    const { checkThis, withThis } = input

    checkThis !== withThis && this.thisIsNotEqual.push(withThis)

    return this.thisIsNotEqual
  }
}
