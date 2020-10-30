import { Validation } from '../../protocols/validation/validation'

interface IInputContent {
  checkThisType: string
  checkTheTypeOfThis: any
}
export class VerifyTypesValidator implements Validation {
  async validate (input: IInputContent): Promise<any> {
    const { checkThisType, checkTheTypeOfThis } = input

    return Object.keys(checkTheTypeOfThis).map((key) => {
      return typeof checkTheTypeOfThis[key] === typeof checkThisType
    })
  }
}
