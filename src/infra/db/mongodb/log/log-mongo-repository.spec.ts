import { Collection } from 'mongodb'
import { LogMongoRepository } from './log-mongo-repository'
import {
  mongoHelper
} from './import-all'
import env from '../../../../main/config/env'

interface ISystemUnderTestTypes {
  systemUnderTest: LogMongoRepository
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const systemUnderTest = new LogMongoRepository()

  return {
    systemUnderTest
  }
}

describe('LogMongoRepository', () => {
  let logErrorCollection: Collection

  beforeAll(async () => {
    await mongoHelper.connect('mongodb://localhost:27017')
  })
  beforeEach(async () => {
    logErrorCollection = await mongoHelper.getCollection(env.collections.log.error)
    await logErrorCollection.deleteMany({})
  })
  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  test('Shoud create an error log on succcess', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    await systemUnderTest.logErrorStack('Error.prototype.stack')
    const countOfErrorRecordsInTheCollection = await logErrorCollection.countDocuments()

    expect(countOfErrorRecordsInTheCollection).toBe(1)
  })
})
