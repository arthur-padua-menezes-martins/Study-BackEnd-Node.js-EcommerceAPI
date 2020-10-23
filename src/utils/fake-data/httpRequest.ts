import { IHttpRequestBody, IHttpRequestBodyComplete } from '../../presentation/protocols/export-all'

export const httpRequestBodyFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']

export const httpRequestBodyAddressFields: string[] = ['cep', 'street', 'number', 'neighborhood', 'city', 'state']

const httpRequestBodyMatchData: any = {
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
export const httpRequestBodyMatch: IHttpRequestBody = {
  ...httpRequestBodyMatchData
}
export const httpRequestBodyMatchComplete: IHttpRequestBodyComplete = {
  ...httpRequestBodyMatchData
}

export const httpRequestBodyNotMatch: IHttpRequestBodyComplete = {
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

export const httpRequestBodyMissingField: IHttpRequestBody = {
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

export const httpRequestBodyInvalidPasswordConfirmation: IHttpRequestBody = {
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

export const getHttpRequestBodyNotMatchField = (fieldName: string, addressFieldName?: string): string => {
  return (fieldName !== undefined && addressFieldName !== undefined) ? httpRequestBodyNotMatch[fieldName][addressFieldName] : httpRequestBodyNotMatch[fieldName]
}

export const getHttpRequestBodyMatchField = (fieldName: string, addressFieldName?: string): string => {
  return (fieldName && addressFieldName) ? httpRequestBodyMatch[fieldName][addressFieldName] : httpRequestBodyMatch[fieldName]
}
