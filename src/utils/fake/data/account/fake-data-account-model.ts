import { signUpHttpRequestBodyMatchComplete } from '../sign-up/fake-data-sign-up-http-request-body'

export const accountModelMatch = {
  id: 'valid_id' as string,
  ...signUpHttpRequestBodyMatchComplete,
  password: 'encrypted_password' as string,
  enabled: true
}
