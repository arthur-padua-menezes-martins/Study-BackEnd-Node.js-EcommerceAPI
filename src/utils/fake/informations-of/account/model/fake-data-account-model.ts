import { informationsOfSignUpHttpRequestBodyMatch } from '../../user/sign-up/fake-data-sign-up-http-request-body'

interface IInformationsOfAccountModelTypes {
  enabled: any
  disabled: any
}
export const informationsOfAccountModel: IInformationsOfAccountModelTypes = {
  enabled: {
    personal: {
      ...informationsOfSignUpHttpRequestBodyMatch.personal,
      password: 'encrypted_password'
    },
    address: informationsOfSignUpHttpRequestBodyMatch.address,
    enabled: true,
    id: 'valid_id'
  },

  disabled: {
    personal: {
      ...informationsOfSignUpHttpRequestBodyMatch.personal,
      password: 'encrypted_password'
    },
    address: informationsOfSignUpHttpRequestBodyMatch.address,
    enabled: false,
    id: 'valid_id'
  }
}

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
