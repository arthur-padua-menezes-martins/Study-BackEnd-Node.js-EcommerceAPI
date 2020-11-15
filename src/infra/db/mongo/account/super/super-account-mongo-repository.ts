import {
  Collection
} from 'mongoose'
import {
  IAccountModel,
  MongoHelper
} from '../import-all'
import env from '../../../../../main/config/env'

export class AccountMongoRepositorySuper {
  static async searchById (collection: Collection, id: string): Promise<IAccountModel | null> {
    const account: IAccountModel | null = await collection.findOne({
      _id: await MongoHelper.createObjectId(id)
    })

    return MongoHelper.map_id(account)
  }

  static async searchByOneField (collection: Collection, fields: object): Promise<IAccountModel | null> {
    for (const [key, value] of Object.entries(fields)) {
      const account: IAccountModel | null = await collection.findOne({
        [`personal.${key}`]: value
      })

      return MongoHelper.map_id(account)
    }

    return null
  }

  static async searchByManyFields (collection: Collection, fields: object): Promise<IAccountModel | null> {
    let search: object = {}

    for (const [key, value] of Object.entries(fields)) {
      if (value) {
        search = Object.assign({}, search, { [`personal.${key}`]: value })
      }
    }

    const account: IAccountModel | null = await collection.findOne(search)
    return MongoHelper.map_id(account)
  }

  static async getCollection (collectionName?: string): Promise<Collection> {
    return await MongoHelper.getCollection(collectionName ?? env.collections.accounts)
  }
}
