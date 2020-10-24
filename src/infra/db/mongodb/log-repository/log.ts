import { LogErrorRepository } from '../../../../data/protocols/log-error-repository'
import { mongoHelper } from '../helper/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack?: string): Promise<void> {
    if (stack) {
      const errorsCollection = await mongoHelper.getCollection('errors')
      await errorsCollection.insertOne({
        stack,
        date: new Date()
      })
    }
  }
}
