import { IAddAccountRepository } from '../../../../data/protocols/repository/account/add-account-repository'
import { IAddAccountModel } from '../../../../domain/usecases/account/add-account'
import { IAccountModel } from '../../../../domain/models/account/account'
import { mongoHelper } from '../helper/mongo-helper'

/**
* @implements {IAddAccountRepository}
*
* @method `add`
* insert the body sign-up request into the collection
* @returns
* new account
*/
export class AccountMongoRepository implements IAddAccountRepository {
  /**
  * @param {IAddAccountModel} accountData
  * sign-up body
  */
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountsCollection = await mongoHelper.getCollection('accounts')
    const resultOfInsertAccountData = await accountsCollection.insertOne(accountData)
    const account = mongoHelper.mapper_id(resultOfInsertAccountData.ops[0])

    return await Promise.resolve(account)
  }
}
