export interface ISendEmailController {
  prepare: (to: string, subject: string, template: string) => Promise<any>
}

export interface SendEmailControllerCredentials {
  host: string
  port: number
  secure: boolean
  authentication: {
    user: string
    password: string
  }
}
