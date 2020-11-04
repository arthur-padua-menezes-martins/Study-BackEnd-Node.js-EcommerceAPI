export interface ISendEmailSignUp {
  signUpConfirmation: (signUpConfirmationId: string, name: string, to: string) => Promise<void>
}
