import { ISearchAccountByFieldRepository, ISearchAccountByFieldRepositoryParams } from '../../../../../data/protocols/repository/account/read/search-account-by-field-repository'
import {
  IAccountModel,
  mongoHelper
} from '../import-all'

export class AccountMongoRepositoryRead implements ISearchAccountByFieldRepository {
  private account: IAccountModel | null = null

  /**
  * @param {string} field
  * field to search for an account
  */
  async searchByField (field: ISearchAccountByFieldRepositoryParams): Promise<IAccountModel | null> {
    const accountsCollection = await mongoHelper.getCollection('accounts')

    if (field.id) {
      this.account = await accountsCollection.findOne({ _id: await mongoHelper.createObjectId(field.id) })
    } else {
      this.account = await accountsCollection.findOne(field)
    }

    return await Promise.resolve(mongoHelper.map_id(this.account))
  }
}
