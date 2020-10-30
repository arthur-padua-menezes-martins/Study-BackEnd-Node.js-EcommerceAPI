import { signUpHttpRequestBodyMatchComplete } from './signUpHttpRequest'

export const accountModelMatch = {
  id: 'valid_id',
  ...signUpHttpRequestBodyMatchComplete,
  password: 'encrypted_password'
}
