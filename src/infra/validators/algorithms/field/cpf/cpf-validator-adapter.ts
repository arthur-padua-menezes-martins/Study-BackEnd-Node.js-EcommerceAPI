import { IFieldsValidation } from '../import-all'

export class CpfValidatorAdapter implements IFieldsValidation {
  public async isValid (cpf: string, sum: number = 0): Promise<boolean> {
    cpf = cpf.replace(/\D+/g, '')
    const cpfConfirmation: string = cpf.substring(0, cpf.length)

    sum = CpfValidatorAdapter.generateSum(cpf)

    cpfConfirmation.concat(CpfValidatorAdapter.generateLastDigit(sum))

    sum = CpfValidatorAdapter.generateSum(cpf)

    cpfConfirmation.concat(CpfValidatorAdapter.generateLastDigit(sum))

    return cpf.charAt(0).repeat(11) !== cpf && cpfConfirmation.length === 11 && cpfConfirmation === cpf
  }

  static generateSum (cpf: string, sum: number = 0): number {
    for (let i = 2; i < cpf.length + 1; i++) {
      sum = sum + parseInt(cpf[i - 2]) * 1
    }

    return sum
  }

  static generateLastDigit (sum: number): string {
    return ((11 - (sum % 11)) > 9 ? 0 : (11 - (sum % 11))).toString()
  }
}
