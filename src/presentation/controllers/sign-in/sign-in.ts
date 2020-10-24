import { Controller, IHttpRequest, IHttpResponse } from './sign-in-protocols'
import { MissingParamError } from '../../errors/export-all'
import {
  ok, badRequest,
  signInHttpRequestBodyFields
} from '../../helpers/export-all'
import '../../../main/prototype'

export class SignInController implements Controller {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    var missingFields: string = ''

    missingFields += missingFields.missingFields(signInHttpRequestBodyFields, httpRequest.body)

    if (missingFields) {
      return badRequest({}, '', new MissingParamError(missingFields))
    }

    return ok({})
  }
}
