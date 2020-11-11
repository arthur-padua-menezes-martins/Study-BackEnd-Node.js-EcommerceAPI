import { informationsOfSignUpHttpRequestBodyMatch } from '../../user/sign-up/fake-data-sign-up-http-request-body'

export const accountModelEnabled = {
  personal: {
    ...informationsOfSignUpHttpRequestBodyMatch.personal,
    password: 'encrypted_password'
  },
  address: informationsOfSignUpHttpRequestBodyMatch.address,
  enabled: true,
  id: 'valid_id'
}

export const accountModelDisabled = {
  personal: {
    ...informationsOfSignUpHttpRequestBodyMatch.personal,
    password: 'encrypted_password'
  },
  address: informationsOfSignUpHttpRequestBodyMatch.address,
  enabled: false,
  id: 'valid_id'
}
