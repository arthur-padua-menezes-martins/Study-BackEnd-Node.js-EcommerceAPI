import {
  AccountMongoRepositorySuper
} from '../super/super-account-mongo-repository'
import {
  ISearchAccountByFieldRepository, ISearchAccountByFieldRepositoryModel,
  ISearchAccountByTokenRepository
} from './read-account-mongo-repository-protocols'
import {
  IAccountModel,
  MongoHelper
} from '../import-all'

export class AccountMongoRepositoryRead extends AccountMongoRepositorySuper implements ISearchAccountByFieldRepository, ISearchAccountByTokenRepository {
  /**
  * @param {ISearchAccountByFieldRepositoryModel} fields
  * field to search for an account
  */
  public async searchByField (fields: ISearchAccountByFieldRepositoryModel): Promise<IAccountModel | null> {
    const collection = await AccountMongoRepositoryRead.getCollection()
    const { id } = fields

    if (id) {
      return await AccountMongoRepositoryRead.searchById(collection, id)
    } else if (Object.keys(fields).length === 1) {
      return await AccountMongoRepositoryRead.searchByOneField(collection, fields)
    } else {
      return await AccountMongoRepositoryRead.searchByManyFields(collection, fields)
    }
  }

  public async searchByToken (token: string, role?: string): Promise<IAccountModel | null> {
    const collection = await AccountMongoRepositoryRead.getCollection()

    const account: IAccountModel | null = await collection.findOne({
      accessToken: token,
      $or: [{ role }, { role: 'administrator' }]
    })

    const findOne = await collection.findOne({})
    console.log('findOne: ', findOne)

    console.log('AccountMongoRepositoryRead -> token: ', token)
    console.log('AccountMongoRepositoryRead -> role: ', role)
    console.log('AccountMongoRepositoryRead -> account: ', account)
    return MongoHelper.map_id(account)
  }
}
