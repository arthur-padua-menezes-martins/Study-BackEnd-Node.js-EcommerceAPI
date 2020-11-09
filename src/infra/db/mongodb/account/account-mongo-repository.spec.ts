import { Collection } from 'mongodb'
import { AccountMongoRepository } from './account-mongo-repository'
import { mongoHelper } from '../helper/mongo-helper'
import {
  signUpHttpRequestBodyFields, signUpHttpRequestBodyAddressFields,
  signUpHttpRequestBodyMatch, fakeDataSignInHttpRequestBodyMatch,
  fakeDataSearchAccountByField
} from '../../../../utils/fake/data/export-all'

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
    await mongoHelper.connect('mongodb://localhost:27017')
  })
  beforeEach(async () => {
    collection = await mongoHelper.getCollection('accounts')
    await collection.deleteMany({})
  })
  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  test('Should return an account on add success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const account = await systemUnderTest.add(signUpHttpRequestBodyMatch)

    expect(account).toBeTruthy()
    for (const key of signUpHttpRequestBodyFields.slice(0, 2)) {
      expect(signUpHttpRequestBodyMatch[key]).toEqual(account[key])
    }
    for (const key of signUpHttpRequestBodyAddressFields) {
      expect(signUpHttpRequestBodyMatch[key]).toEqual(account[key])
    }
  })

  test('Should return an account on searchByField success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    await collection.insertOne(signUpHttpRequestBodyMatch)
    const account = await systemUnderTest.searchByField({ ...fakeDataSearchAccountByField, email: fakeDataSignInHttpRequestBodyMatch.email })

    expect(account).toBeTruthy()
    if (account) {
      for (const key of signUpHttpRequestBodyFields.slice(0, 2)) {
        expect(signUpHttpRequestBodyMatch[key]).toEqual(account[key])
      }
      for (const key of signUpHttpRequestBodyAddressFields) {
        expect(signUpHttpRequestBodyMatch[key]).toEqual(account[key])
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
    const accountOptions = await collection.insertOne(signUpHttpRequestBodyMatch)
    await systemUnderTest.updateAccessToken((accountOptions.ops[0])._id, anyToken)
    const account = await collection.findOne({ _id: (accountOptions.ops[0])._id })

    expect(account).toBeTruthy()
    expect(account.accessToken).toBe(anyToken)
  })
})
