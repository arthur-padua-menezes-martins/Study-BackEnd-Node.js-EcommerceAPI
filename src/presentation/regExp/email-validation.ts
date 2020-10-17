export interface EmailValidatorWithRegex {
  email: (value: string) => Promise<boolean>
}
