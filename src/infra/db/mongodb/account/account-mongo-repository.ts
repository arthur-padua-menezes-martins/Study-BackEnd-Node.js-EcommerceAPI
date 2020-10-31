import { IAddAccountRepository, SearchAccountByEmailRepository, UpdateAccessTokenRepository } from '../../../../data/protocols/repository/account/export-all'
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
export class AccountMongoRepository implements IAddAccountRepository, SearchAccountByEmailRepository, UpdateAccessTokenRepository {
  /**
  * @param {IAddAccountModel} accountData
  * sign-up body
  */
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountsCollection = await mongoHelper.getCollection('accounts')
    const accountOptions = await accountsCollection.insertOne(accountData)
    const account = mongoHelper.map_id(accountOptions.ops[0])

    return await Promise.resolve(account)
  }

  async searchByEmail (email: string): Promise<IAccountModel | null> {
    const accountsCollection = await mongoHelper.getCollection('accounts')
    const account: IAccountModel | null = await accountsCollection.findOne({ email })

    return await Promise.resolve(mongoHelper.map_id(account))
  }

  async updateAccessToken (id: string, accessToken: string): Promise<void> {
    const accountsCollection = await mongoHelper.getCollection('accounts')
    await accountsCollection.updateOne(
      { _id: id },
      { $set: { accessToken } },
      { upsert: true }
    )
  }
}
