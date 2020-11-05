import { IValidation } from '../../../../protocols/validation/validation'

interface IVerifyTypesValidatorParams {
  checkThisType: string
  checkTheTypeOfThis: any
}
export class VerifyTypesValidator implements IValidation {
  async validate (input: IVerifyTypesValidatorParams): Promise<boolean[]> {
    const { checkThisType, checkTheTypeOfThis } = input

    return Object.keys(checkTheTypeOfThis).map((key) => {
      return typeof checkTheTypeOfThis[key] === typeof checkThisType
    })
  }
}
