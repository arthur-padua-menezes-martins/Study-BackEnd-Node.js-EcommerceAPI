import { IHttpRequest, IHttpResponse } from './sign-up-protocols'
import { MissingParamError } from '../../errors/export-all'

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

    return {
      statusCode: 400,
      body: {

      },
      errorMessage: new MissingParamError(MissingFields)
    }
  }
}
