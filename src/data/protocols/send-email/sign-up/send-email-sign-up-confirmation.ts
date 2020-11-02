/**
* @interface
* general interface for send email to confirm sign up
* @method `sendEmailSignUpConfirmation`
* send email to confirm user sign up
*/
export interface ISendEmailSignUpConfirmation {
  sendEmailSignUpConfirmation: (html: any, to: string) => Promise<boolean>
}
