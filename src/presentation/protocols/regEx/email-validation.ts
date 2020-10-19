export interface EmailValidatorWithRegex {
  isValid: (value: string) => Promise<boolean>
}
