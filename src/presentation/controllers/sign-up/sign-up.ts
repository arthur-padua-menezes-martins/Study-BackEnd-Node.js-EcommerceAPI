import { IHttpRequest, IHttpResponse } from './sign-up-protocols'
import { MissingParamError, InvalidParamError } from '../../errors/export-all'
import { badRequest } from '../../helpers/export-all'

export class SignUpController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const httpRequestBodyFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']
    const httpRequestBodyAddressFields: string[] = ['cep', 'street', 'number', 'neighborhood', 'city', 'state']
    var MissingFields: string = ''

    for (const field of httpRequestBodyFields) {
      MissingFields += !(field in httpRequest.body) ? `${field} ` : ''
    }
    if ('address' in httpRequest.body && httpRequest.body.address !== undefined) {
      for (const addressField of httpRequestBodyAddressFields) {
        MissingFields += !(addressField in httpRequest.body.address) ? `${addressField} ` : ''
      }
    }

    const { password, passwordConfirmation } = httpRequest.body
    if (password !== passwordConfirmation) {
      return badRequest({}, '', new InvalidParamError('passwordConfirmation'))
    }

    return badRequest({}, '', new MissingParamError(MissingFields))
  }
}
