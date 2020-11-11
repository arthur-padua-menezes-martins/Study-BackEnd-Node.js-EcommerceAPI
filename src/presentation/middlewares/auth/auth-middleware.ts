import {
  IMiddleware,
  IHttpRequest, IHttpResponse
} from './auth-middleware-protocols'
import {
  AccessDeniedError
} from './add-survey-controller-errors'
import {
  forbidden
} from './add-survey-controller-helpers'

export class AuthMiddleare implements IMiddleware {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}
