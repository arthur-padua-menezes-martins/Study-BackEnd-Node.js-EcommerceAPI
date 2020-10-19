export interface IFieldValidationWithRegex {
  options: (field: string, value: string) => Promise<string>
}

export interface IFieldValidationFieldsWithRegex {
  [name: string]: (value: string) => Promise<boolean>

  email: (value: string) => Promise<boolean>

  password: (value: string) => Promise<boolean>
}
