import {
  Collection
} from 'mongoose'
import {
  MongoHelper
} from './import-all'

export class MongoRepositorySuper {
  static async getCollection (collectionName: string): Promise<Collection> {
    return await MongoHelper.getCollection(collectionName)
  }

  static async searchById (collection: Collection, id: string): Promise<any> {
    const result: any = await collection.findOne({
      _id: await MongoHelper.createObjectId(id)
    })

    return MongoHelper.mapTheId(result)
  }

  static async searchByOneField (collection: Collection, fields: object): Promise<any> {
    for (const [key, value] of Object.entries(fields)) {
      const result: any = await collection.findOne({
        [`personal.${key}`]: value
      })

      return MongoHelper.mapTheId(result)
    }

    return null
  }

  static async searchByManyFields (collection: Collection, fields: object): Promise<any> {
    let search: object = {}

    for (const [key, value] of Object.entries(fields)) {
      if (value) {
        search = Object.assign({}, search, { [`personal.${key}`]: value })
      }
    }

    const result: any = await collection.findOne(search)
    return MongoHelper.mapTheId(result)
  }

  static async customSearchForOne (collection: Collection, search: object): Promise<any> {
    const result: any = MongoHelper.mapTheId(
      await collection.findOne(search)
    )

    return result
  }

  static async customSearchForMany (collection: Collection, search: object): Promise<any> {
    const result: any = MongoHelper.mapTheId(
      collection.find(search)
    )

    return result
  }

  static async accessOps (content: any): Promise<any> {
    if (content.ops.length === 1) {
      return MongoHelper.mapTheId(content.ops[0])
    }
  }
}
