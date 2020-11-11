import {
  Collection
} from 'mongodb'
import {
  AccountMongoRepository
} from './account-mongo-repository'
import {
  MongoHelper
} from '../helper/mongo-helper'
import {
  informationsOfSignUpHttpRequestBodyFields, informationsOfSignUpHttpRequestBodyAddressFields,
  informationsOfSignUpHttpRequestBodyMatch, informationsOfSignInHttpRequestBodyMatch,
  informationsOfSearchAccountByField
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
    await MongoHelper.connect(env.mongoUrlLocalhost)
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
    const account = await systemUnderTest.add(informationsOfSignUpHttpRequestBodyMatch)

    expect(account).toBeTruthy()
    for (const key of informationsOfSignUpHttpRequestBodyFields.slice(0, 2)) {
      expect(informationsOfSignUpHttpRequestBodyMatch[key]).toEqual(account[key])
    }
    for (const key of informationsOfSignUpHttpRequestBodyAddressFields) {
      expect(informationsOfSignUpHttpRequestBodyMatch[key]).toEqual(account[key])
    }
  })

  test('Should return an account on searchByField success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    await collection.insertOne(informationsOfSignUpHttpRequestBodyMatch)
    const account = await systemUnderTest.searchByField({ ...informationsOfSearchAccountByField, email: informationsOfSignInHttpRequestBodyMatch.email })

    expect(account).toBeTruthy()
    if (account) {
      for (const key of informationsOfSignUpHttpRequestBodyFields.slice(0, 2)) {
        expect(informationsOfSignUpHttpRequestBodyMatch[key]).toEqual(account[key])
      }
      for (const key of informationsOfSignUpHttpRequestBodyAddressFields) {
        expect(informationsOfSignUpHttpRequestBodyMatch[key]).toEqual(account[key])
      }
    }
  })

  test('Should return null on searchByField fails <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const account = await systemUnderTest.searchByField({ ...informationsOfSearchAccountByField, email: informationsOfSignInHttpRequestBodyMatch.email })

    expect(account).toBeFalsy()
  })

  test('Should update the account accessToken on updateAccessToken success <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const accountOptions = await collection.insertOne(informationsOfSignUpHttpRequestBodyMatch)
    await systemUnderTest.updateAccessToken((accountOptions.ops[0])._id, anyToken)
    const account = await collection.findOne({ _id: (accountOptions.ops[0])._id })

    expect(account).toBeTruthy()
    expect(account.accessToken).toBe(anyToken)
  })
})
