import { AccountMongoRepository } from './account'
import { mongoHelper } from '../helper/mongo-helper'
import {
  httpRequestBodyFields, httpRequestBodyAddressFields,
  httpRequestBodyMatchComplete
} from '../../../../utils/fake-data/httpRequest'

interface ISystemUnderTestTypes {
  systemUnderTest: AccountMongoRepository
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const systemUnderTest = new AccountMongoRepository()

  return {
    systemUnderTest
  }
}

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await mongoHelper.connect('mongodb://localhost:27017')
  })
  beforeEach(async () => {
    const accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  test('Should return an account on success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const account = await systemUnderTest.add(httpRequestBodyMatchComplete)

    expect(account).toBeTruthy()
    for (const key of httpRequestBodyFields.slice(0, 2)) {
      expect(httpRequestBodyMatchComplete[key]).toEqual(account[key])
    }
    for (const key of httpRequestBodyAddressFields) {
      expect(httpRequestBodyMatchComplete[key]).toEqual(account[key])
    }
  })
})
