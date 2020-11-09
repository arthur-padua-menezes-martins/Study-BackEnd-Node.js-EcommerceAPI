import { IHttpRequestBody } from '../../../../../presentation/protocols/http/request/http-request-body'

export const fakeDataSignInHttpRequestBodyFields: string[] = ['email', 'password']

const fakeDataSignInHttpRequestBodyMatchData: any = {
  personal: {
    email: 'arthur.software.developer@gmail.com' as string,
    password: 'password123' as string
  }
}
export const fakeDataSignInHttpRequestBodyMatch: IHttpRequestBody['user']['informations']['personal'] = {
  ...fakeDataSignInHttpRequestBodyMatchData
}

export const fakeDataSignInHttpRequestBodyNotMatch: any = {
  personal: {
    email: '$#@!%¨&*()_+[]{}`^?:;/~@' as string,
    password: 'pass' as string
  }
}

export const fakeDataSignInHttpRequestBodyMissingField: any = {
  personal: {
    email: 'arthur.software.developer@gmail.com' as string
  }
}

export const getfakeDataSignInHttpRequestBodyNotMatchField = (fieldName: string): string => {
  return fakeDataSignInHttpRequestBodyNotMatch[fieldName]
}
