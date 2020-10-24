import { AccountMongoRepository } from './account'
import { mongoHelper } from '../helper/mongo-helper'
import {
  signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields,
  signUpHttpRequestBodyMatchComplete
} from '../../../../utils/fake-data/signUpHttpRequest'

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
    const accountsCollection = await mongoHelper.getCollection('accounts')
    await accountsCollection.deleteMany({})
  })
  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  test('Should return an account on success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const account = await systemUnderTest.add(signUpHttpRequestBodyMatchComplete)

    expect(account).toBeTruthy()
    for (const key of signUpHttpRequestBodyFields.slice(0, 2)) {
      expect(signUpHttpRequestBodyMatchComplete[key]).toEqual(account[key])
    }
    for (const key of signUpHttpRequestBodyAddressFields) {
      expect(signUpHttpRequestBodyMatchComplete[key]).toEqual(account[key])
    }
  })
})
