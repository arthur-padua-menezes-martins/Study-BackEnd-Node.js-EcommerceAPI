export interface PasswordValidatorWithRegex {
  isValid: (value: string) => Promise<boolean>
}
