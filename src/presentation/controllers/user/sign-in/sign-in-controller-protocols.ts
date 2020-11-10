import {
  IHttpRequest,
  IHttpResponse
} from '../../../protocols/http/export-all'

export {
  IHttpRequest,
  IHttpResponse
}
export {
  IController
} from '../../../protocols/controller/controller'
export {
  IValidation
} from '../../../protocols/validation/validation'
export {
  IAuthentication
} from '../../../../domain/usecases/account/auth/authentication'

export interface IDefineProperties {
  personal: IHttpRequest['body']['user']['informations']['personal']
  generateTypes: Generator<string, any, unknown>
  generatedType: IteratorResult<string, any>
  validation: {
    content: string[]
    error: IHttpResponse | null
  }
}
