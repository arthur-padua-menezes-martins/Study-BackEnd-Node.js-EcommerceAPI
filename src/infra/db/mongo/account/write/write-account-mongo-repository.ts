import {
  AccountMongoRepositorySuper
} from '../super/super-account-mongo-repository'
import {
  IAddAccountRepository
} from '../../../../../data/protocols/repository/account/write/add-account-repository'
import {
  IAddAccountModel
} from '../../../../../domain/usecases/account/write/add-account'
import {
  IAccountModel,
  MongoHelper
} from '../import-all'

export class AccountMongoRepositoryWrite extends AccountMongoRepositorySuper implements IAddAccountRepository {
  /**
  * @method `add`
  * insert the body sign-up request into the collection
  * @param {IAddAccountModel} accountData
  * sign-up body
  */
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountsCollection = await AccountMongoRepositoryWrite.getCollection()
    const accountOptions = await accountsCollection.insertOne(accountData)
    const account = MongoHelper.map_id(accountOptions.ops[0])

    return account
  }
}
