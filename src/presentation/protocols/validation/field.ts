import { IHttpRequestBody } from '../http/http'

export interface IInputContent {
  fields: string[]
  body: IHttpRequestBody
}

export interface IFieldValidation {
  options: (field: string, value: string) => Promise<string>

  exec: (input: IInputContent) => Promise<string[]>
}

export interface IFieldValidationOptions {
  [methods: string]: (value: string) => Promise<boolean>
}
