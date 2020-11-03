import { LogErrorRepository } from '../../../../../data/protocols/repository/log/error/log-error-repository'
import { mongoHelper } from '../../helper/mongo-helper'

export class LogErrorMongoRepository implements LogErrorRepository {
  async logErrorStack (stack?: string): Promise<void> {
    if (stack) {
      const errorsCollection = await mongoHelper.getCollection('log-error')
      await errorsCollection.insertOne({
        stack,
        date: new Date()
      })
    }
  }
}
