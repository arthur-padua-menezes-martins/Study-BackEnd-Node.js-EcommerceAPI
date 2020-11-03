import {
  IEmailSender, ISendEmailController, SendEmailControllerCredentials
} from './import-all'
import { SendEmailTemplates } from './templates/send-email-templates'
import { NodemailerAdapter } from './adapter/nodemailer/nodemailer-adapter'
import env from '../../../main/config/env'

export class SendEmailController extends SendEmailTemplates implements ISendEmailController {
  private readonly credentials: SendEmailControllerCredentials = {
    host: env.sendEmail.host,
    port: Number(env.sendEmail.port),
    secure: Boolean(env.sendEmail.secure),
    authentication: {
      user: env.sendEmail.auth.user,
      password: env.sendEmail.auth.password
    }
  }

  private readonly emailSender: IEmailSender = new NodemailerAdapter(this.credentials)

  async prepare (to: string, subject: string, template: string): Promise<any> {
    const shippingInformation = await this.emailSender.sendEmail(
      env.sendEmail.from, to, subject, template
    )

    return shippingInformation
  }
}
