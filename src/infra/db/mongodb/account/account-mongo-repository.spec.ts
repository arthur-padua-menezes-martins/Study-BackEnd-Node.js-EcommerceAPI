import { Collection } from 'mongodb'
import { AccountMongoRepository } from './account-mongo-repository'
import { MongoHelper } from '../helper/mongo-helper'
import {
  fakeDataSignUpHttpRequestBodyFields, fakeDataSignUpHttpRequestBodyAddressFields,
  fakeDataSignUpHttpRequestBodyMatch, fakeDataSignInHttpRequestBodyMatch,
  fakeDataSearchAccountByField
} from '../../../../utils/fake/data/export-all'
import env from '../../../../main/config/env'

interface ISystemUnderTestTypes {
  systemUnderTest: AccountMongoRepository
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const systemUnderTest = new AccountMongoRepository()

  return {
    systemUnderTest
  }
}

let collection: Collection
const anyToken = 'any_token'

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://localhost:27017')
  })
  beforeEach(async () => {
    collection = await MongoHelper.getCollection(env.collections.accounts)
    await collection.deleteMany({})
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on add success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const account = await systemUnderTest.add(fakeDataSignUpHttpRequestBodyMatch)

    expect(account).toBeTruthy()
    for (const key of fakeDataSignUpHttpRequestBodyFields.slice(0, 2)) {
      expect(fakeDataSignUpHttpRequestBodyMatch[key]).toEqual(account[key])
    }
    for (const key of fakeDataSignUpHttpRequestBodyAddressFields) {
      expect(fakeDataSignUpHttpRequestBodyMatch[key]).toEqual(account[key])
    }
  })

  test('Should return an account on searchByField success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    await collection.insertOne(fakeDataSignUpHttpRequestBodyMatch)
    const account = await systemUnderTest.searchByField({ ...fakeDataSearchAccountByField, email: fakeDataSignInHttpRequestBodyMatch.email })

    expect(account).toBeTruthy()
    if (account) {
      for (const key of fakeDataSignUpHttpRequestBodyFields.slice(0, 2)) {
        expect(fakeDataSignUpHttpRequestBodyMatch[key]).toEqual(account[key])
      }
      for (const key of fakeDataSignUpHttpRequestBodyAddressFields) {
        expect(fakeDataSignUpHttpRequestBodyMatch[key]).toEqual(account[key])
      }
    }
  })

  test('Should return null on searchByField fails <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const account = await systemUnderTest.searchByField({ ...fakeDataSearchAccountByField, email: fakeDataSignInHttpRequestBodyMatch.email })

    expect(account).toBeFalsy()
  })

  test('Should update the account accessToken on updateAccessToken success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const accountOptions = await collection.insertOne(fakeDataSignUpHttpRequestBodyMatch)
    await systemUnderTest.updateAccessToken((accountOptions.ops[0])._id, anyToken)
    const account = await collection.findOne({ _id: (accountOptions.ops[0])._id })

    expect(account).toBeTruthy()
    expect(account.accessToken).toBe(anyToken)
  })
})
