import { IHttpRequestBody } from '../http'

export interface IFieldValidationWithRegex {
  options: (field: string, value: string) => Promise<string>

  exec: (fields: string[], body: IHttpRequestBody) => Promise<string[]>
}

export interface IFieldValidationFieldsWithRegex {
  [name: string]: (value: string) => Promise<boolean>

  name?: (value: string) => Promise<boolean>

  email?: (value: string) => Promise<boolean>

  password?: (value: string) => Promise<boolean>
}
