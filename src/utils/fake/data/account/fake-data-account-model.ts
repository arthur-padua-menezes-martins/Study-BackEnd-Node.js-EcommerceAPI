import { signUpHttpRequestBodyMatchComplete } from '../user/sign-up/fake-data-sign-up-http-request-body'

export const accountModelEnabled = {
  id: 'valid_id' as string,
  ...signUpHttpRequestBodyMatchComplete,
  password: 'encrypted_password' as string,
  enabled: true
}

export const accountModelDisabled = {
  id: 'valid_id' as string,
  ...signUpHttpRequestBodyMatchComplete,
  password: 'encrypted_password' as string,
  enabled: false
}
