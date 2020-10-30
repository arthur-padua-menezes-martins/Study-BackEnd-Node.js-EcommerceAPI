import { Validation } from '../../protocols/validation/validation'

interface IInputContent {
  checkThis: any
  withThis: any
}
export class CompareFieldsValidator implements Validation {
  async validate (input: IInputContent): Promise<any> {
    const { checkThis, withThis } = input
    return checkThis === withThis ?? true
  }
}
