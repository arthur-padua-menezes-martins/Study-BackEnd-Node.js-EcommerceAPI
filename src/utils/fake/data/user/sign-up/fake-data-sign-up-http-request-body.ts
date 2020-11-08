import { IHttpRequestBody } from '../../../../../presentation/protocols/http/request/http-request-body'

export const signUpHttpRequestBodyFields: string[] = ['name', 'email', 'password', 'passwordConfirmation', 'cpf']

export const signUpHttpRequestBodyAddressFields: string[] = ['cep', 'street', 'number', 'neighborhood', 'city', 'state']

const signUpHttpRequestBodyMatchData: any = {
  personal: {
    name: 'name lastName',
    email: 'arthur.software.developer@gmail.com',
    password: 'password123',
    passwordConfirmation: 'password123',
    cpf: '624.804.443-09'
  },
  address: {
    cep: '60741-025',
    street: 'Rua Dr. Justa Araújo',
    number: '185',
    neighborhood: 'Serrinha',
    city: 'Fortaleza',
    state: 'CE'
  }
}
export const signUpHttpRequestBodyMatch: IHttpRequestBody['user']['informations'] = {
  ...signUpHttpRequestBodyMatchData
}

export const signUpHttpRequestBodyNotMatch: IHttpRequestBody['user']['informations'] = {
  personal: {
    name: 'name',
    email: '$#@!%¨&*()_+[]{}`^?:;/~@',
    password: 'password',
    passwordConfirmation: 'password',
    cpf: '624.804.443-00'
  },
  address: {
    cep: '00000-000',
    street: 'Rua Dr. Justa Araújo',
    number: '185',
    neighborhood: 'Serrinha',
    city: 'Fortaleza',
    state: 'YZ'
  }
}

export const signUpHttpRequestBodyMissingField: any = {
  personal: {
    email: 'arthur.software.developer@gmail.com',
    password: 'password',
    passwordConfirmation: 'password',
    cpf: '624.804.443-09'
  },
  address: {
    cep: '60741-025',
    street: 'Rua Dr. Justa Araújo',
    number: '185',
    neighborhood: 'Serrinha',
    city: 'Fortaleza',
    state: 'CE'
  }
}

export const signUpHttpRequestBodyInvalidPasswordConfirmation: any = {
  personal: {
    name: 'name lastName',
    email: 'arthur.software.developer@gmail.com',
    password: 'password',
    passwordConfirmation: 'pass',
    cpf: '624.804.443-09'
  },
  address: {
    cep: '60741-025',
    street: 'Rua Dr. Justa Araújo',
    number: '185',
    neighborhood: 'Serrinha',
    city: 'Fortaleza',
    state: 'CE'
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
