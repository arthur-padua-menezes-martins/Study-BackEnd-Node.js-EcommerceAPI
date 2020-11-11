import { IHttpRequestBody } from '../../import-all'

export const informationsOfSignInHttpRequestBodyFields: string[] = ['email', 'password']

const informationsOfSignInHttpRequestBodyMatchData: any = {
  personal: {
    email: 'arthur.software.developer@gmail.com',
    password: 'password123'
  }
}
export const informationsOfSignInHttpRequestBodyMatch: IHttpRequestBody['user']['informations']['personal'] = {
  ...informationsOfSignInHttpRequestBodyMatchData
}

export const informationsOfSignInHttpRequestBodyNotMatch: any = {
  email: '$#@!%¨&*()_+[]{}`^?:;/~@',
  password: 'pass123'
}

export const informationsOfSignInHttpRequestBodyMissingField: any = {
  email: 'arthur.software.developer@gmail.com'
}

export const getinformationsOfSignInHttpRequestBodyNotMatchField = (fieldName: string): string => {
  return informationsOfSignInHttpRequestBodyNotMatch[fieldName]
}
