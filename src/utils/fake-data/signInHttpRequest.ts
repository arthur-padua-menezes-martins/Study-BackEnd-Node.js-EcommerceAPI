import { IHttpRequestBody, IHttpRequestBodyComplete } from '../../presentation/protocols/http/http-request-body'

export const signInHttpRequestBodyFields: string[] = ['email', 'password']

const signInHttpRequestBodyMatchData: any = {
  email: 'arthur.software.developer@gmail.com' as string,
  password: 'password123' as string
}
export const signInHttpRequestBodyMatch: IHttpRequestBody = {
  ...signInHttpRequestBodyMatchData
}
export const signInHttpRequestBodyMatchComplete: IHttpRequestBodyComplete = {
  ...signInHttpRequestBodyMatchData
}

export const signInHttpRequestBodyNotMatch: IHttpRequestBody = {
  email: '$#@!%¨&*()_+[]{}`^?:;/~@' as string,
  password: 'pass' as string
}

export const signInHttpRequestBodyMissingField: IHttpRequestBody = {
  email: 'arthur.software.developer@gmail.com' as string
}

export const getsignInHttpRequestBodyNotMatchField = (fieldName: string): string => {
  return signInHttpRequestBodyNotMatch[fieldName]
}
