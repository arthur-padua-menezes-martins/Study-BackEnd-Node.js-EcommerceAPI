import { IValidation } from '../../../../protocols/validation/validation'

interface ICompareFieldsValidatorParams {
  checkThis: string
  withThis: string
}
export class CompareFieldsValidator implements IValidation {
  async validate (input: ICompareFieldsValidatorParams): Promise<any> {
    const { checkThis, withThis } = input

    return checkThis !== withThis ? [''] : []
  }
}
