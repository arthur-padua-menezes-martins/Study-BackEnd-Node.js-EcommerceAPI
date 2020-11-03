import { IAddAccountRepository } from '../../../../../data/protocols/repository/account/write/add-account-repository'
import { IAddAccountModel } from '../../../../../domain/usecases/account/write/add-account'
import {
  IAccountModel,
  mongoHelper
} from '../import-all'

export class AccountMongoRepositoryWrite implements IAddAccountRepository {
  /**
  * @method `add`
  * insert the body sign-up request into the collection
  * @param {IAddAccountModel} accountData
  * sign-up body
* @param {string} getThisCollection
  * the schema to add a new account
  */
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountsCollection = await mongoHelper.getCollection('accounts')
    const accountOptions = await accountsCollection.insertOne(accountData)
    const account = mongoHelper.map_id(accountOptions.ops[0])

    return await Promise.resolve(account)
  }
}
