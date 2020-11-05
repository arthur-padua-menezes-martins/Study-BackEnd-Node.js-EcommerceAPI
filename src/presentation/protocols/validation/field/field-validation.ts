import { IFieldValidationInputContent } from './field-validation-input-content'

export interface IFieldValidation {
  options: (field: string, value: string) => Promise<string>

  exec: (input: IFieldValidationInputContent) => Promise<string[]>
}
