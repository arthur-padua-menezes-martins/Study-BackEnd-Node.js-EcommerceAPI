import { Collection } from 'mongodb'
import { AccountMongoRepository } from './account-mongo-repository'
import { mongoHelper } from '../helper/mongo-helper'
import {
  signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields,
  signUpHttpRequestBodyMatchComplete, signInHttpRequestBodyMatchComplete
} from '../../../../utils/fake-data/export-all'

interface ISystemUnderTestTypes {
  systemUnderTest: AccountMongoRepository
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const systemUnderTest = new AccountMongoRepository()

  return {
    systemUnderTest
  }
}

let accountsCollection: Collection
const anyToken = 'any_token'

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await mongoHelper.connect('mongodb://localhost:27017')
  })
  beforeEach(async () => {
    accountsCollection = await mongoHelper.getCollection('accounts')
    await accountsCollection.deleteMany({})
  })
  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  test('Should return an account on add success <version: 0.0.1>', async () => {
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

  test('Should return an account on searchByEmail success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    await accountsCollection.insertOne(signUpHttpRequestBodyMatchComplete)
    const account = await systemUnderTest.searchByEmail(signInHttpRequestBodyMatchComplete.email)

    expect(account).toBeTruthy()
    if (account) {
      for (const key of signUpHttpRequestBodyFields.slice(0, 2)) {
        expect(signUpHttpRequestBodyMatchComplete[key]).toEqual(account[key])
      }
      for (const key of signUpHttpRequestBodyAddressFields) {
        expect(signUpHttpRequestBodyMatchComplete[key]).toEqual(account[key])
      }
    }
  })

  test('Should return null on searchByEmail fails <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const account = await systemUnderTest.searchByEmail(signInHttpRequestBodyMatchComplete.email)

    expect(account).toBeFalsy()
  })

  test('Should update the account accessToken on updateAccessToken success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const accountOptions = await accountsCollection.insertOne(signUpHttpRequestBodyMatchComplete)
    await systemUnderTest.updateAccessToken((accountOptions.ops[0])._id, anyToken)
    const account = await accountsCollection.findOne({ _id: (accountOptions.ops[0])._id })

    expect(account).toBeTruthy()
    expect(account.accessToken).toBe(anyToken)
  })
})
