import { IHttpRequestBody } from '../../import-all'

export const fakeDataSignUpHttpRequestBodyFields: string[] = ['name', 'email', 'password', 'passwordConfirmation', 'cpf', 'cep', 'street', 'number', 'neighborhood', 'city', 'state']
export const fakeDataSignUpHttpRequestBodyPersonalFields: string[] = ['name', 'email', 'password', 'passwordConfirmation', 'cpf']
export const fakeDataSignUpHttpRequestBodyAddressFields: string[] = ['cep', 'street', 'number', 'neighborhood', 'city', 'state']

const fakeDatafakeDataSignUpHttpRequestBodyMatchData: any = {
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
export const fakeDataSignUpHttpRequestBodyMatch: IHttpRequestBody['user']['informations'] = {
  ...fakeDatafakeDataSignUpHttpRequestBodyMatchData
}

export const fakeDataSignUpHttpRequestBodyNotMatch: IHttpRequestBody['user']['informations'] = {
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

export const fakeDataSignUpHttpRequestBodyMissingField: any = {
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

export const fakeDataSignUpHttpRequestBodyInvalidPasswordConfirmation: any = {
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

export const getfakeDataSignUpHttpRequestBodyNotMatchField = (personalField: string, addressField?: string): string => {
  return addressField
    ? fakeDataSignUpHttpRequestBodyNotMatch.address[addressField]
    : fakeDataSignUpHttpRequestBodyNotMatch.personal[personalField]
}

export const getfakeDataSignUpHttpRequestBodyMatchField = (personalField: string, addressField?: string): string => {
  return addressField
    ? fakeDataSignUpHttpRequestBodyMatch.address[addressField]
    : fakeDataSignUpHttpRequestBodyMatch.personal[personalField]
}
