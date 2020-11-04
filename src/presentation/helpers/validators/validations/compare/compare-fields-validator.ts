import { Validation } from '../../../../protocols/validation/validation'

interface IInputContentCompareFieldsValidator {
  checkThis: string
  withThis: string
}
export class CompareFieldsValidator implements Validation {
  async validate (input: IInputContentCompareFieldsValidator): Promise<any> {
    const { checkThis, withThis } = input
    return checkThis === withThis ?? true
  }
}
