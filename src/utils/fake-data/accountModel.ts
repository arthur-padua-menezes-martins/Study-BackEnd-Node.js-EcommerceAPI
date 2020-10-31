import { signUpHttpRequestBodyMatchComplete } from './signUpHttpRequest'

export const accountModelMatch = {
  id: 'valid_id' as string,
  ...signUpHttpRequestBodyMatchComplete,
  password: 'encrypted_password' as string
}
