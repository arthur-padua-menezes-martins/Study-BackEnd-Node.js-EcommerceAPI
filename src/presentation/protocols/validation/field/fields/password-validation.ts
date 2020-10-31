export interface IPasswordValidator {
  isValid: (value: string) => Promise<boolean>
}
