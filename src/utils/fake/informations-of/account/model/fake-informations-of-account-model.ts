import {
  informationsOfSignUpHttpRequest
} from '../../user/sign-up/fake-informations-of-sign-up-http-request-body'

interface IInformationsOfAccountModelTypes {
  enabled: any
  disabled: any
}
export const informationsOfAccountModel: IInformationsOfAccountModelTypes = {
  enabled: {
    personal: {
      ...informationsOfSignUpHttpRequest.bodyMatch.personal,
      password: 'encrypted_password'
    },
    address: informationsOfSignUpHttpRequest.bodyMatch.address,
    enabled: true,
    id: 'valid_id'
  },

  disabled: {
    personal: {
      ...informationsOfSignUpHttpRequest.bodyMatch.personal,
      password: 'encrypted_password'
    },
    address: informationsOfSignUpHttpRequest.bodyMatch.address,
    enabled: false,
    id: 'valid_id'
  }
}
