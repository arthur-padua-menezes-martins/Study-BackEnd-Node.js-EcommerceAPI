export interface IAuthenticationModel {
  email: string
  password: string
}

/**
* @interface
* general interface for authentication confirmation
* @method `auth`
* authentication informations for validate
*/
export interface Authentication {
  auth: (authentication: IAuthenticationModel) => Promise<string>
}
