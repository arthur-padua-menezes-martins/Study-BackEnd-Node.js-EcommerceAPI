import nodemailer, { Transporter, SentMessageInfo } from 'nodemailer'
import { IEmailSender, SendEmailControllerCredentials } from '../../import-all'

interface INodemailerTransporter {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}
export class NodemailerAdapter implements IEmailSender {
  private readonly transporter: Transporter

  /**
  * @param credentials
  * smtp credentials
  */
  constructor (
    private readonly credentials: SendEmailControllerCredentials
  ) {
    const { authentication } = this.credentials
    this.transporter = nodemailer.createTransport(Object.assign({}, this.credentials, {
      auth: {
        user: authentication.user,
        pass: authentication.password
      }
    }) as INodemailerTransporter)
  }

  /**
  * @param from
  * email from
  * @param to
  * email to
  * @param subject
  * email subject
  * @param template
  * email template
  */
  async sendEmail (from: string, to: string, subject: string, template: string): Promise<any> {
    this.transporter.verify((err, success) => {
      if (success) {
        this.transporter.sendMail({
          from,
          to,
          subject,
          html: template
        }, (error: Error | null, informations: SentMessageInfo): void => {

        })
      }
    })
  }
}
