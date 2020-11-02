import { UpdateAccessTokenRepository } from '../../../../../data/protocols/repository/account/export-all'
import { mongoHelper } from '../import-all'

export class AccountMongoRepositoryUpdate implements UpdateAccessTokenRepository {
  /**
  * @param {string} id
  * id to search for an account
  * @param {string} accessToken
  * new value to update accessToken field
  */
  async updateAccessToken (id: string, accessToken: string): Promise<void> {
    const accountsCollection = await mongoHelper.getCollection('accounts')
    await accountsCollection.updateOne(
      { _id: id },
      { $set: { accessToken } },
      { upsert: true }
    )
  }
}
