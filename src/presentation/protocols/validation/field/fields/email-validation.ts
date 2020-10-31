export interface IEmailValidator {
  isValid: (value: string) => Promise<boolean>
}
