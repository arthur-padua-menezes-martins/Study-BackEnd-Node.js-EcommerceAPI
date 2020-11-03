export interface IEmailSender {
  sendEmail: (from: string, to: string, subject: string, template: string) => Promise<any>
}
