import { IHttpRequest, IHttpResponse } from './sign-up-protocols'

export class SignUpController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return {
      statusCode: 400,
      body: {

      }
    }
  }
}
