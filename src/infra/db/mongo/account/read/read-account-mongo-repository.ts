import {
  AccountMongoRepositorySuper,
  ISearchAccountByFieldRepository, ISearchAccountByFieldRepositoryModel,
  ISearchAccountByTokenRepository
} from './read-account-mongo-repository-protocols'
import {
  IAccountModel
} from '../import-all'

export class AccountMongoRepositoryRead extends AccountMongoRepositorySuper implements ISearchAccountByFieldRepository, ISearchAccountByTokenRepository {
  /**
  * @param {ISearchAccountByFieldRepositoryModel} fields
  * field to search for an account
  */
  public async searchByField (fields: ISearchAccountByFieldRepositoryModel): Promise<IAccountModel | null> {
    const collection = await AccountMongoRepositoryRead.getCollection()
    let account: IAccountModel | null = null

    if (fields.id) {
      account = await AccountMongoRepositoryRead.searchById(collection, fields.id)
    } else if (Object.keys(fields).length === 1) {
      account = await AccountMongoRepositoryRead.searchByOneField(collection, fields)
    } else {
      account = await AccountMongoRepositoryRead.searchByManyFields(collection, fields)
    }

    return account
  }

  public async searchByToken (token: string, role?: string): Promise<IAccountModel | null> {
    const collection = await AccountMongoRepositoryRead.getCollection()

    const account: IAccountModel | null = await AccountMongoRepositoryRead.customSearchForOne(collection, {
      accessToken: token,
      $or: [{ role }, { role: 'administrator' }]
    })

    return account
  }
}
