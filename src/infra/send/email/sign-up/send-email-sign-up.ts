import { SendEmailController } from '../export-all'
import { ISendEmailSignUp } from '../import-all'
import env from '@/main/config/env'

export class SendEmailSignUpController extends SendEmailController implements ISendEmailSignUp {
  private readonly subject: string = 'verificação de autenticidade'

  async signUpConfirmation (signUpConfirmationId: string, name: string, to: string): Promise<void> {
    await this.prepare(
      to,
      this.subject,
      await this.getTemplate('signUpConfirmation', {
        api: env.api,
        signUpConfirmationId,
        name
      })
    )
  }
}
