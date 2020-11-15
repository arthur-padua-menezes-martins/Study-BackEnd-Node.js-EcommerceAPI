import {
  Collection
} from 'mongoose'
import {
  MongoRepositorySuper
} from '../../super/super-mongo-repository'
import {
  MongoHelper
} from '../import-all'
import env from '../../../../../main/config/env'

export class AccountMongoRepositorySuper extends MongoRepositorySuper {
  static async getCollection (collectionName?: string): Promise<Collection> {
    return await MongoHelper.getCollection(collectionName ?? env.collections.accounts)
  }
}
