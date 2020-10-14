import { IHttpRequest, IHttpResponse } from './sign-up-protocols'
import { MissingParamError } from '../../errors/export-all'

export class SignUpController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const httpRequestFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']

    var MissingFields: string = ''
    for (const field of httpRequestFields) {
      MissingFields += !(field in httpRequest.body) ? `${field} ` : ''
    }

    return {
      statusCode: 400,
      body: {

      },
      errorMessage: new MissingParamError(MissingFields)
    }
  }
}
