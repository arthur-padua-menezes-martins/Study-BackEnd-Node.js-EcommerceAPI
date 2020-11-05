import { IHttpRequestBody, IHttpRequestBodyComplete } from '../../../../../presentation/protocols/http/request/http-request-body'

export const signUpHttpRequestBodyFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']

export const signUpHttpRequestBodyAddressFields: string[] = ['cep', 'street', 'number', 'neighborhood', 'city', 'state']

const signUpHttpRequestBodyMatchData: any = {
  name: 'name lastName' as string,
  email: 'arthur.software.developer@gmail.com' as string,
  password: 'password123' as string,
  passwordConfirmation: 'password123' as string,
  address: {
    cep: '60741-025' as string,
    street: 'Rua Dr. Justa Araújo' as string,
    number: '185' as string,
    neighborhood: 'Serrinha' as string,
    city: 'Fortaleza' as string,
    state: 'CE' as string
  }
}
export const signUpHttpRequestBodyMatch: IHttpRequestBody = {
  ...signUpHttpRequestBodyMatchData
}
export const signUpHttpRequestBodyMatchComplete: IHttpRequestBodyComplete = {
  ...signUpHttpRequestBodyMatchData
}

export const signUpHttpRequestBodyNotMatch: IHttpRequestBody = {
  name: 'name' as string,
  email: '$#@!%¨&*()_+[]{}`^?:;/~@' as string,
  password: 'password' as string,
  passwordConfirmation: 'password' as string,
  address: {
    cep: '00000-000' as string,
    street: 'Rua Dr. Justa Araújo' as string,
    number: '185' as string,
    neighborhood: 'Serrinha' as string,
    city: 'Fortaleza' as string,
    state: 'YZ' as string
  }
}

export const signUpHttpRequestBodyMissingField: IHttpRequestBody = {
  email: 'arthur.software.developer@gmail.com' as string,
  password: 'password' as string,
  passwordConfirmation: 'password' as string,
  address: {
    cep: '60741-025' as string,
    street: 'Rua Dr. Justa Araújo' as string,
    number: '185' as string,
    neighborhood: 'Serrinha' as string,
    city: 'Fortaleza' as string,
    state: 'CE' as string
  }
}

export const signUpHttpRequestBodyInvalidPasswordConfirmation: IHttpRequestBody = {
  name: 'name lastName' as string,
  email: 'arthur.software.developer@gmail.com' as string,
  password: 'password' as string,
  passwordConfirmation: 'pass' as string,
  address: {
    cep: '60741-025' as string,
    street: 'Rua Dr. Justa Araújo' as string,
    number: '185' as string,
    neighborhood: 'Serrinha' as string,
    city: 'Fortaleza' as string,
    state: 'CE' as string
  }
}

export const getSignUpHttpRequestBodyNotMatchField = (fieldName: string, addressFieldName?: string): string => {
  return (fieldName && addressFieldName) ? signUpHttpRequestBodyNotMatch[fieldName][addressFieldName] : signUpHttpRequestBodyNotMatch[fieldName]
}

export const getSignUpHttpRequestBodyMatchField = (fieldName: string, addressFieldName?: string): string => {
  return (fieldName && addressFieldName) ? signUpHttpRequestBodyMatch[fieldName][addressFieldName] : signUpHttpRequestBodyMatch[fieldName]
}
