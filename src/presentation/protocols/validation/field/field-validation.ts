import { IInputContent } from './field-validation-input-content'

export interface IFieldValidation {
  options: (field: string, value: string) => Promise<string>

  exec: (input: IInputContent) => Promise<string[]>
}
