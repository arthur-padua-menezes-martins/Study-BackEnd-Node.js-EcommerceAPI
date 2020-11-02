import { ISearchAccountByFieldRepository } from '../../../../../data/protocols/repository/account/read/search-account-by-field-repository'
import { ISearchAccountByFieldModel } from '../../../../../domain/usecases/account/read/search-account-by-field'
import {
  IAccountModel,
  mongoHelper
} from '../import-all'

export class AccountMongoRepositoryRead implements ISearchAccountByFieldRepository {
  /**
  * @param {string} field
  * field to search for an account
  */
  async searchByField (field: ISearchAccountByFieldModel): Promise<IAccountModel | null> {
    const accountsCollection = await mongoHelper.getCollection('accounts')
    const account: IAccountModel | null = await accountsCollection.findOne(field)

    return await Promise.resolve(mongoHelper.map_id(account))
  }
}
