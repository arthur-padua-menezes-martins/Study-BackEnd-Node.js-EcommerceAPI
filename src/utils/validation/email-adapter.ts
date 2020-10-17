import { EmailValidatorWithRegex } from '../../presentation/regExp/email-validation'

export class EmailValidatorAdapter implements EmailValidatorWithRegex {
  async email (value: string): Promise<boolean> {
    return await Promise.resolve(
      Boolean(value.match(/^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/))
    )
  }
}
