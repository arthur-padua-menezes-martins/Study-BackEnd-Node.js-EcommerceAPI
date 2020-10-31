import { Collection } from 'mongodb'
import { LogMongoRepository } from './log-mongo-repository'
import { mongoHelper } from '../helper/mongo-helper'

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
  let errorsCollection: Collection

  beforeAll(async () => {
    await mongoHelper.connect('mongodb://localhost:27017')
  })
  beforeEach(async () => {
    errorsCollection = await mongoHelper.getCollection('errors')
    await errorsCollection.deleteMany({})
  })
  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  test('Shoud create an error log on succcess', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    await systemUnderTest.logError('Error.prototype.stack')
    const countOfErrorRecordsInTheCollection = await errorsCollection.countDocuments()

    expect(countOfErrorRecordsInTheCollection).toBe(1)
  })
})
