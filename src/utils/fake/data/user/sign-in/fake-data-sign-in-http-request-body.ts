import { IHttpRequestBody } from '../../import-all'

export const fakeDataSignInHttpRequestBodyFields: string[] = ['email', 'password']

const fakeDataSignInHttpRequestBodyMatchData: any = {
  personal: {
    email: 'arthur.software.developer@gmail.com',
    password: 'password123'
  }
}
export const fakeDataSignInHttpRequestBodyMatch: IHttpRequestBody['user']['informations']['personal'] = {
  ...fakeDataSignInHttpRequestBodyMatchData
}

export const fakeDataSignInHttpRequestBodyNotMatch: any = {
  email: '$#@!%¨&*()_+[]{}`^?:;/~@',
  password: 'pass123'
}

export const fakeDataSignInHttpRequestBodyMissingField: any = {
  email: 'arthur.software.developer@gmail.com'
}

export const getfakeDataSignInHttpRequestBodyNotMatchField = (fieldName: string): string => {
  return fakeDataSignInHttpRequestBodyNotMatch[fieldName]
}
