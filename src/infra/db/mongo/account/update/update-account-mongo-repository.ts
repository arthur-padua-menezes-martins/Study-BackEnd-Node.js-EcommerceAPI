import {
  AccountMongoRepositorySuper,
  IUpdateAccessTokenRepository,
  IUpdateEnabledAccountRepository
} from './update-account-mongo-repository-protocols'
import {
  MongoHelper
} from '../import-all'

export class AccountMongoRepositoryUpdate extends AccountMongoRepositorySuper implements IUpdateAccessTokenRepository, IUpdateEnabledAccountRepository {
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
}
