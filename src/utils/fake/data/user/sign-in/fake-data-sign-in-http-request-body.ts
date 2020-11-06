import { IHttpRequestBody } from '../../../../../presentation/protocols/http/request/http-request-body'

export const signInHttpRequestBodyFields: string[] = ['email', 'password']

const signInHttpRequestBodyMatchData: any = {
  personal: {
    email: 'arthur.software.developer@gmail.com' as string,
    password: 'password123' as string
  }
}
export const signInHttpRequestBodyMatch: IHttpRequestBody['user']['informations']['personal'] = {
  ...signInHttpRequestBodyMatchData
}

export const signInHttpRequestBodyNotMatch: any = {
  personal: {
    email: '$#@!%¨&*()_+[]{}`^?:;/~@' as string,
    password: 'pass' as string
  }
}

export const signInHttpRequestBodyMissingField: any = {
  personal: {
    email: 'arthur.software.developer@gmail.com' as string
  }
}

export const getsignInHttpRequestBodyNotMatchField = (fieldName: string): string => {
  return signInHttpRequestBodyNotMatch[fieldName]
}
