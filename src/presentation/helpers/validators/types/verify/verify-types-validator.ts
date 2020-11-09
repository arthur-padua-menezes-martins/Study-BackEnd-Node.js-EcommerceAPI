import { IValidation } from '../../../../protocols/validation/validation'

interface IVerifyTypesValidatorParams {
  checkThisType: any
  checkTheTypeOfThis: any
}
export class VerifyTypesValidator implements IValidation {
  async validate (input: IVerifyTypesValidatorParams): Promise<string[]> {
    const { checkTheTypeOfThis, checkThisType } = input
    const theTypeOfThisIsNotValid: string[] = []

    Object.keys(checkTheTypeOfThis).map(key => {
      (typeof checkTheTypeOfThis[key] !== typeof checkThisType) &&
        theTypeOfThisIsNotValid.push(checkTheTypeOfThis)
    })

    return theTypeOfThisIsNotValid
  }
}
