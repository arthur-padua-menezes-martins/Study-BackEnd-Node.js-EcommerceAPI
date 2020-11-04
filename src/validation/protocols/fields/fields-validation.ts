export interface IFieldsValidation {
  isValid: (value: string) => Promise<boolean>
}
