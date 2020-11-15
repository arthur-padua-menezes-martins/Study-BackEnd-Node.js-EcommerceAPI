import {
  AccountMongoRepositorySuper,
  IAddAccountRepository, IAddAccountModel
} from './write-account-mongo-repository-protocols'
import {
  IAccountModel
} from '../import-all'

export class AccountMongoRepositoryWrite extends AccountMongoRepositorySuper implements IAddAccountRepository {
  /**
  * @method `add`
  * insert the body sign-up request into the collection
  * @param {IAddAccountModel} accountData
  * sign-up body
  */
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const collection = await AccountMongoRepositoryWrite.getCollection()

    const account: IAccountModel = await AccountMongoRepositoryWrite.accessOps(
      await collection.insertOne(accountData)
    )

    return account
  }
}
