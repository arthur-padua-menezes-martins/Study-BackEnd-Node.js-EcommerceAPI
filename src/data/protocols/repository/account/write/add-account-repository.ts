import { IAddAccountModel } from '../../../../../domain/usecases/account/write/add-account'
import { IAccountModel } from '../import-all'

/**
* @interface
* general interface for add account in database
* @method `add`
* add new account record to the database
*/
export interface IAddAccountRepository {
  add: (accountData: IAddAccountModel) => Promise<IAccountModel>
}
