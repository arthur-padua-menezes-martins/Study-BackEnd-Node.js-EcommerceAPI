import { IHttpRequestBody } from '../../import-all'

export const informationsOfSignUpHttpRequestBodyFields: string[] = ['name', 'email', 'password', 'passwordConfirmation', 'cpf', 'cep', 'street', 'number', 'neighborhood', 'city', 'state']
export const informationsOfSignUpHttpRequestBodyPersonalFields: string[] = ['name', 'email', 'password', 'passwordConfirmation', 'cpf']
export const informationsOfSignUpHttpRequestBodyAddressFields: string[] = ['cep', 'street', 'number', 'neighborhood', 'city', 'state']

const informationsOfinformationsOfSignUpHttpRequestBodyMatchData: any = {
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
export const informationsOfSignUpHttpRequestBodyMatch: IHttpRequestBody['user']['informations'] = {
  ...informationsOfinformationsOfSignUpHttpRequestBodyMatchData
}

export const informationsOfSignUpHttpRequestBodyNotMatch: IHttpRequestBody['user']['informations'] = {
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

export const informationsOfSignUpHttpRequestBodyMissingField: any = {
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

export const informationsOfSignUpHttpRequestBodyInvalidPasswordConfirmation: any = {
  personal: {
    name: 'name lastName',
    email: 'arthur.software.developer@gmail.com',
    password: 'password',
    passwordConfirmation: 'pass123',
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

export const getinformationsOfSignUpHttpRequestBodyNotMatchField = (personalField: string, addressField?: string): string => {
  return addressField
    ? informationsOfSignUpHttpRequestBodyNotMatch.address[addressField]
    : informationsOfSignUpHttpRequestBodyNotMatch.personal[personalField]
}

export const getinformationsOfSignUpHttpRequestBodyMatchField = (personalField: string, addressField?: string): string => {
  return addressField
    ? informationsOfSignUpHttpRequestBodyMatch.address[addressField]
    : informationsOfSignUpHttpRequestBodyMatch.personal[personalField]
}
