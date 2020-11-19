import {
  Collection
} from 'mongodb'
import {
  AccountMongoRepository
} from './account-mongo-repository'
import {
  informationsOfSearchAccountByField, informationsOfSignUpHttpRequest
} from './account-mongo-repository-utils'
import {
  MongoHelper
} from './import-all'
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
const token = {
  any: 'any_token'
}
const role = {
  administrator: 'administrator'
}

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

  describe('add', () => {
    test('should return an account on add success <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      const account = await systemUnderTest.add(informationsOfSignUpHttpRequest.bodyMatch)

      expect(account).toBeTruthy()
      for (const key of (informationsOfSignUpHttpRequest.bodyFields).slice(0, 2)) {
        expect((informationsOfSignUpHttpRequest.bodyMatch)[key]).toEqual(account[key])
      }
      for (const key of informationsOfSignUpHttpRequest.bodyAddressFields) {
        expect((informationsOfSignUpHttpRequest.bodyMatch)[key]).toEqual(account[key])
      }
    })
  })

  describe('searchByField', () => {
    test('should return an account on searchByField success <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      await collection.insertOne(informationsOfSignUpHttpRequest.bodyMatch)

      const account = await systemUnderTest.searchByField({
        ...informationsOfSearchAccountByField,
        email: informationsOfSignUpHttpRequest.bodyMatch.personal.email
      })

      expect(account).toBeTruthy()
      if (account) {
        for (const key of (informationsOfSignUpHttpRequest.bodyFields).slice(0, 2)) {
          expect((informationsOfSignUpHttpRequest.bodyMatch)[key]).toEqual(account[key])
        }
        for (const key of informationsOfSignUpHttpRequest.bodyAddressFields) {
          expect((informationsOfSignUpHttpRequest.bodyMatch)[key]).toEqual(account[key])
        }
      }
    })

    test('should return null on searchByField fails <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      const account = await systemUnderTest.searchByField({
        ...informationsOfSearchAccountByField,
        email: informationsOfSignUpHttpRequest.bodyMatch.personal.email
      })

      expect(account).toBeFalsy()
    })

    test('should update the account accessToken on updateAccessToken success <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      const accountOptions = await collection.insertOne(informationsOfSignUpHttpRequest.bodyMatch)
      await systemUnderTest.updateAccessToken((accountOptions.ops[0])._id, token.any)
      const account = await collection.findOne({ _id: (accountOptions.ops[0])._id })

      expect(account).toBeTruthy()
      expect(account.accessToken).toBe(token.any)
    })
  })

  describe('searchByToken', () => {
    test('should return null on searchByToken with invalid role <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      jest.spyOn(systemUnderTest, 'searchByToken').mockImplementationOnce(async (): Promise<null> => {
        return null
      })
      const account = await systemUnderTest.searchByToken(token.any, role.administrator)

      expect(account).toBeNull()
    })

    test('should return an account on searchByToken with administrator role <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      await collection.insertOne({
        ...informationsOfSignUpHttpRequest.bodyMatch,
        accessToken: token.any,
        role: role.administrator
      })

      const account = await systemUnderTest.searchByToken(token.any, role.administrator)

      expect(account).toBeTruthy()
    })

    test('should return an account on searchByToken with user is administrator <version: 0.0.1>', async () => {
      const { systemUnderTest } = await makeSystemUnderTest()

      await collection.insertOne({
        ...informationsOfSignUpHttpRequest.bodyMatch,
        accessToken: token.any,
        role: role.administrator
      })

      const account = await systemUnderTest.searchByToken(token.any)

      expect(account).toBeTruthy()
    })
  })
})
