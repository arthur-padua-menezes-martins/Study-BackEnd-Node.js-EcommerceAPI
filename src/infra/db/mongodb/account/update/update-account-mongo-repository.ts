import { IUpdateAccessTokenRepository, IUpdateEnabledAccountRepository } from '../../../../../data/protocols/repository/account/update/export-all'
import {
  mongoHelper
} from '../import-all'

export class AccountMongoRepositoryUpdate implements IUpdateAccessTokenRepository, IUpdateEnabledAccountRepository {
  /**
  * @param {string} id
  * id to search for an account
  * @param {string} accessToken
  * new value to update accessToken field
  */
  async updateAccessToken (id: string, accessToken: string): Promise<void> {
    const accountsCollection = await mongoHelper.getCollection('accounts')
    await accountsCollection.updateOne(
      { _id: await mongoHelper.createObjectId(id) },
      { $set: { accessToken } }
    )
  }

  async updateEnabled (id: string, status: boolean): Promise<void> {
    const accountsCollection = await mongoHelper.getCollection('accounts')
    await accountsCollection.updateOne(
      { _id: await mongoHelper.createObjectId(id) },
      { $set: { enabled: status } }
    )
  }
}
