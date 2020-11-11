import { Collection } from 'mongodb'
import { ISearchAccountByFieldRepository, ISearchAccountByFieldRepositoryModel } from '../../../../../data/protocols/repository/account/read/search-account-by-field-repository'
import {
  IAccountModel,
  MongoHelper
} from '../import-all'
import env from '../../../../../main/config/env'

export class AccountMongoRepositoryRead implements ISearchAccountByFieldRepository {
  /**
  * @param {ISearchAccountByFieldRepositoryModel} fields
  * field to search for an account
  */
  public async searchByField (fields: ISearchAccountByFieldRepositoryModel): Promise<IAccountModel | null> {
    const collection = await AccountMongoRepositoryRead.getCollection()
    let account: IAccountModel | null = null

    const { id } = fields
    if (id) {
      account = await AccountMongoRepositoryRead.searchById(collection, id)
    } else if (Object.keys(fields).length === 1) {
      account = await AccountMongoRepositoryRead.searchByOneField(collection, fields)
    } else {
      account = await AccountMongoRepositoryRead.searchByManyFields(collection, fields)
    }

    return account
  }

  static async searchById (collection: Collection<any>, id: string): Promise<IAccountModel | null> {
    return await collection.findOne({
      _id: await MongoHelper.createObjectId(id)
    })
  }

  static async searchByOneField (collection: Collection<any>, fields: object): Promise<IAccountModel | null> {
    let search: IAccountModel | null = null
    for (const [key, value] of Object.entries(fields)) {
      search = await collection.findOne({ [`personal.${key}`]: value })
    }

    return search
  }

  static async searchByManyFields (collection: Collection<any>, fields: object): Promise<IAccountModel | null> {
    let search: object = {}
    for (const [key, value] of Object.entries(fields)) {
      if (value) {
        search = Object.assign({}, search, { [`personal.${key}`]: value })
      }
    }

    return await collection.findOne(search)
  }

  static async getCollection (): Promise<Collection> {
    return await MongoHelper.getCollection(env.collections.accounts)
  }
}
