import {
  ISendEmailSignUp
} from './mock-email-sender-components'

export const mockEmailSender = async (): Promise<ISendEmailSignUp> => {
  class SendEmailSignUpControllerStub implements ISendEmailSignUp {
    async signUpConfirmation (): Promise<void> {

    }
  }

  return new SendEmailSignUpControllerStub()
}
