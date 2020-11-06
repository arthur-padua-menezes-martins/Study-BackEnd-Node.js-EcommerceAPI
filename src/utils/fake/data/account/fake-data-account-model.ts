import { signUpHttpRequestBodyMatch } from '../user/sign-up/fake-data-sign-up-http-request-body'

export const accountModelEnabled = {
  personal: {
    ...signUpHttpRequestBodyMatch.personal,
    password: 'encrypted_password' as string
  },
  address: signUpHttpRequestBodyMatch.address,
  enabled: true,
  id: 'valid_id' as string
}

export const accountModelDisabled = {
  personal: {
    ...signUpHttpRequestBodyMatch.personal,
    password: 'encrypted_password' as string
  },
  address: signUpHttpRequestBodyMatch.address,
  enabled: false,
  id: 'valid_id' as string
}
