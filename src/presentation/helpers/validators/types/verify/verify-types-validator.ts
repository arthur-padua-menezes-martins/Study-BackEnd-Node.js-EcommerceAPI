import { IValidation } from '../../../../protocols/validation/validation'

interface IVerifyTypesValidatorParams {
  checkThisType: any
  checkTheTypeOfThis: any
}
export class VerifyTypesValidator implements IValidation {
  private readonly theTypeOfThisIsNotValid: string[] = []

  async validate (input: IVerifyTypesValidatorParams): Promise<string[]> {
    const { checkTheTypeOfThis, checkThisType } = input

    Object.keys(checkTheTypeOfThis).map((key) => {
      (typeof checkTheTypeOfThis[key] !== typeof checkThisType) &&
        this.theTypeOfThisIsNotValid.push(checkTheTypeOfThis)
    })

    return this.theTypeOfThisIsNotValid
  }
}
