import { IHttpRequest, IHttpResponse } from './sign-up-protocols'
import { MissingParamError } from '../../errors/export-all'

export class SignUpController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return {
      statusCode: 400,
      body: {

      },
      errorMessage: new MissingParamError()
    }
  }
}
