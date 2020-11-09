import { ISendEmailSignUp } from './make-email-sender-components'

export const makeEmailSender = async (): Promise<ISendEmailSignUp> => {
  class SendEmailSignUpControllerStub implements ISendEmailSignUp {
    async signUpConfirmation (): Promise<void> {

    }
  }

  return new SendEmailSignUpControllerStub()
}
