import {
  IHttpRequest, IHttpResponse
} from '../../../protocols/export-all'

export {
  IHttpRequest,
  IHttpResponse
}
export {
  IController
} from '../../../protocols/export-all'
export {
  IValidation
} from '../../../protocols/validation/validation'
export {
  IAddAccount, IAddAccountModel,
  IUpdateEnabledAccount
} from '../../../../domain/usecases/account/export-all'
export {
  ISendEmailSignUp
} from '../../../../domain/usecases/send/email/sign-up/send-email-sign-up'
export {
  IAccountModel
} from '../../../../domain/models/account/account'

export interface IDefineProperties {
  personal: IHttpRequest['body']['user']['informations']['personal']
  address: IHttpRequest['body']['user']['informations']['address']
  generateTypes: Generator<string, any, unknown>
  generatedType: IteratorResult<string, any>
  validation: {
    content: string[]
    error: IHttpResponse | null
  }
}