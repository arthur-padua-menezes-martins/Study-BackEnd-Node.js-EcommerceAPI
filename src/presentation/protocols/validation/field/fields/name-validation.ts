export interface INameValidator {
  isValid: (value: string) => Promise<boolean>
}
