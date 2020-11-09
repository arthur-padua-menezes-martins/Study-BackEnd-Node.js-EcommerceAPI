import { fakeDataSignUpHttpRequestBodyMatch } from '../user/sign-up/fake-data-sign-up-http-request-body'

export const accountModelEnabled = {
  personal: {
    ...fakeDataSignUpHttpRequestBodyMatch.personal,
    password: 'encrypted_password'
  },
  address: fakeDataSignUpHttpRequestBodyMatch.address,
  enabled: true,
  id: 'valid_id'
}

export const accountModelDisabled = {
  personal: {
    ...fakeDataSignUpHttpRequestBodyMatch.personal,
    password: 'encrypted_password'
  },
  address: fakeDataSignUpHttpRequestBodyMatch.address,
  enabled: false,
  id: 'valid_id'
}
