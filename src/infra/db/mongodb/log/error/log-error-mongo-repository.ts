import { LogErrorRepository } from '../../../../../data/protocols/repository/log/error/log-error-repository'
import {
  mongoHelper
} from '../import-all'
import env from '../../../../../main/config/env'

export class LogErrorMongoRepository implements LogErrorRepository {
  async logErrorStack (stack?: string): Promise<void> {
    if (stack) {
      const errorsCollection = await mongoHelper.getCollection(env.collections.log.error)
      await errorsCollection.insertOne({
        stack,
        date: new Date()
      })
    }
  }
}
