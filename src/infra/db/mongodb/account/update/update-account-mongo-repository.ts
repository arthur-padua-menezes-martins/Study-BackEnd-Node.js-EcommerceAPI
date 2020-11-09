import { Collection } from 'mongodb'
import { IUpdateAccessTokenRepository, IUpdateEnabledAccountRepository } from '../../../../../data/protocols/repository/account/update/export-all'
import {
  MongoHelper
} from '../import-all'
import env from '../../../../../main/config/env'

export class AccountMongoRepositoryUpdate implements IUpdateAccessTokenRepository, IUpdateEnabledAccountRepository {
  /**
  * @param {string} id
  * id to search for an account
  * @param {string} accessToken
  * new value to update accessToken field
  */
  public async updateAccessToken (id: string, accessToken: string): Promise<void> {
    const collection = await AccountMongoRepositoryUpdate.getCollection()

    await collection.updateOne(
      { _id: await MongoHelper.createObjectId(id) },
      { $set: { accessToken } }
    )
  }

  public async updateEnabled (id: string, status: boolean): Promise<void> {
    const collection = await AccountMongoRepositoryUpdate.getCollection()

    await collection.updateOne(
      { _id: await MongoHelper.createObjectId(id) },
      { $set: { enabled: status } }
    )
  }

  static async getCollection (): Promise<Collection> {
    return await MongoHelper.getCollection(env.collections.accounts)
  }
}
