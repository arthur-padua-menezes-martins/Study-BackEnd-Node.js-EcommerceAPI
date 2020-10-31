import {
  IAccountInformationsModel,
  ICreateAccountInformationsModel, ISignInAccountInformationsModel, ISaveAccountInformationsModel, IGetAccountInformationsModel
} from './import-all'

/**
* @interface
* specific interface to manage the storage and retrieval of data related to account
* @method `create`
* store create account informations
* @method `signIn`
* store sign in informations
* @method `save`
* store the update account informations
* @method `get`
* retrieve information about account
*/
export interface IAccountInformationsRepository {
  create: (createAccountInformations: ICreateAccountInformationsModel) => void
  signIn: (signInInformations: ISignInAccountInformationsModel) => void
  save: (saveAccountInformations: ISaveAccountInformationsModel) => void
  get: (searchInformation: IGetAccountInformationsModel) => Promise<IAccountInformationsModel>
}
