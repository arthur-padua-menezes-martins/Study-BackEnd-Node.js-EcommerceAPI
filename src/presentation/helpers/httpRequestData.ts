export const httpRequestBodyFields: string[] = ['name', 'email', 'password', 'passwordConfirmation']

export const httpRequestBodyAddressFields: string[] = ['cep', 'street', 'number', 'neighborhood', 'city', 'state']

export const httpRequestBodyMatch = {
  name: 'name lastName',
  email: 'arthur.software.developer@gmail.com',
  password: 'password123',
  passwordConfirmation: 'password123',
  address: {
    cep: '60741-025',
    street: 'Rua Dr. Justa Araújo',
    number: '185',
    neighborhood: 'Serrinha',
    city: 'Fortaleza',
    state: 'CE'
  }
}

export const httpRequestBodyNotMatch = {
  name: 'name',
  email: '$#@!%¨&*()_+[]{}`^?:;/~@',
  password: 'password',
  passwordConfirmation: 'password',
  address: {
    cep: '00000-000',
    street: 'Rua Dr. Justa Araújo',
    number: '185',
    neighborhood: 'Serrinha',
    city: 'Fortaleza',
    state: 'YZ'
  }
}

export const httpRequestBodyMissingField = {
  email: 'arthur.software.developer@gmail.com',
  password: 'password',
  passwordConfirmation: 'password',
  address: {
    cep: '60741-025',
    street: 'Rua Dr. Justa Araújo',
    number: '185',
    neighborhood: 'Serrinha',
    city: 'Fortaleza',
    state: 'CE'
  }
}

export const httpRequestBodyInvalidPasswordConfirmation = {
  name: 'name lastName',
  email: 'arthur.software.developer@gmail.com',
  password: 'password',
  passwordConfirmation: 'pass',
  address: {
    cep: '60741-025',
    street: 'Rua Dr. Justa Araújo',
    number: '185',
    neighborhood: 'Serrinha',
    city: 'Fortaleza',
    state: 'CE'
  }
}
