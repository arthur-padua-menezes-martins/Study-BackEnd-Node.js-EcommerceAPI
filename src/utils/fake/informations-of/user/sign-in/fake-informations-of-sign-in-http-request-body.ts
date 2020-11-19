interface IInformationsOfSignInHttpRequestTypes {
  bodyFields: string[]
  bodyMatchData: any
  bodyMatch: any
  bodyNotMatch: any
  bodyMissingField: any
  getBodyNotMatch: Function
}

export const informationsOfSignInHttpRequest: IInformationsOfSignInHttpRequestTypes = {
  bodyFields: ['email', 'password'],
  bodyMatchData: {
    personal: {
      email: 'arthur.software.developer@gmail.com',
      password: 'password123'
    }
  },
  bodyMatch: {
    email: 'arthur.software.developer@gmail.com',
    password: 'password123'
  },
  bodyNotMatch: {
    email: '$#@!%¨&*()_+[]{}`^?:;/~@',
    password: 'pass123'
  },
  bodyMissingField: {
    email: 'arthur.software.developer@gmail.com'
  },
  getBodyNotMatch: (fieldName: string): string => {
    return informationsOfSignInHttpRequest.bodyNotMatch[fieldName]
  }
}
