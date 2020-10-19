export interface NameValidatorWithRegex {
  isValid: (value: string) => Promise<boolean>
}
