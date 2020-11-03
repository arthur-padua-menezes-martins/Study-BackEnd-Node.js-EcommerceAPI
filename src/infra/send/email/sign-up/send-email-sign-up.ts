import { SendEmailController } from '../send-email-controller'
import env from '../../../../main/config/env'

export interface ISendEmailSignUp {
  signUpConfirmation: (signUpConfirmationId: string, name: string, to: string) => Promise<void>
}
export class SendEmailSignUpController extends SendEmailController implements ISendEmailSignUp {
  private readonly subject: string = 'verificação de autenticidade'

  async signUpConfirmation (signUpConfirmationId: string, name: string, to: string): Promise<void> {
    await this.prepare(
      to,
      this.subject,
      await this.getTemplate('signUpConfirmation', { api: env.api, signUpConfirmationId, name })
    )
  }
}
