export interface IFieldValidationOptions {
  [methods: string]: (value: string) => Promise<boolean>
}
