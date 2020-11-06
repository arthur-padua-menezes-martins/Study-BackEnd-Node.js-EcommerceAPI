import { IHttpRequestBody } from '../../../../../presentation/protocols/http/request/http-request-body'

export const signUpHttpRequestBodyFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']

export const signUpHttpRequestBodyAddressFields: string[] = ['cep', 'street', 'number', 'neighborhood', 'city', 'state']

const signUpHttpRequestBodyMatchData: any = {
  personal: {
    name: 'name lastName' as string,
    email: 'arthur.software.developer@gmail.com' as string,
    password: 'password123' as string,
    passwordConfirmation: 'password123' as string
  },
  address: {
    cep: '60741-025' as string,
    street: 'Rua Dr. Justa Araújo' as string,
    number: '185' as string,
    neighborhood: 'Serrinha' as string,
    city: 'Fortaleza' as string,
    state: 'CE' as string
  }
}
export const signUpHttpRequestBodyMatch: IHttpRequestBody['user']['informations'] = {
  ...signUpHttpRequestBodyMatchData
}

export const signUpHttpRequestBodyNotMatch: IHttpRequestBody['user']['informations'] = {
  personal: {
    name: 'name' as string,
    email: '$#@!%¨&*()_+[]{}`^?:;/~@' as string,
    password: 'password' as string,
    passwordConfirmation: 'password' as string
  },
  address: {
    cep: '00000-000' as string,
    street: 'Rua Dr. Justa Araújo' as string,
    number: '185' as string,
    neighborhood: 'Serrinha' as string,
    city: 'Fortaleza' as string,
    state: 'YZ' as string
  }
}

export const signUpHttpRequestBodyMissingField: any = {
  personal: {
    email: 'arthur.software.developer@gmail.com' as string,
    password: 'password' as string,
    passwordConfirmation: 'password' as string
  },
  address: {
    cep: '60741-025' as string,
    street: 'Rua Dr. Justa Araújo' as string,
    number: '185' as string,
    neighborhood: 'Serrinha' as string,
    city: 'Fortaleza' as string,
    state: 'CE' as string
  }
}

export const signUpHttpRequestBodyInvalidPasswordConfirmation: any = {
  personal: {
    name: 'name lastName' as string,
    email: 'arthur.software.developer@gmail.com' as string,
    password: 'password' as string,
    passwordConfirmation: 'pass' as string
  },
  address: {
    cep: '60741-025' as string,
    street: 'Rua Dr. Justa Araújo' as string,
    number: '185' as string,
    neighborhood: 'Serrinha' as string,
    city: 'Fortaleza' as string,
    state: 'CE' as string
  }
}

export const getSignUpHttpRequestBodyNotMatchField = (personalField: string, addressField?: string): string => {
  return addressField
    ? signUpHttpRequestBodyNotMatch.address[addressField]
    : signUpHttpRequestBodyNotMatch.personal[personalField]
}

export const getSignUpHttpRequestBodyMatchField = (personalField: string, addressField?: string): string => {
  return addressField
    ? signUpHttpRequestBodyMatch.address[addressField]
    : signUpHttpRequestBodyMatch.personal[personalField]
}
