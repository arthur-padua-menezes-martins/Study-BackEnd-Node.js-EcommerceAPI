import {
  Collection
} from 'mongodb'
import {
  SurveyMongoRepository
} from './survey-mongo-repository'
import {
  MongoHelper
} from '../helper/mongo-helper'
import {
  informationsOfAddSurveyHttpRequestBody
} from '../../../../utils/fake/data/survey/add/fake-data-add-survey-http-request-body'
import env from '../../../../main/config/env'

interface ISystemUnderTestTypes {
  systemUnderTest: SurveyMongoRepository
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const systemUnderTest = new SurveyMongoRepository()

  return {
    systemUnderTest
  }
}

let collection: Collection
const httpRequest = informationsOfAddSurveyHttpRequestBody

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrlLocalhost)
  })
  beforeEach(async () => {
    collection = await MongoHelper.getCollection(env.collections.surveys)
    await collection.deleteMany({})
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('must create a new survey <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()

    await systemUnderTest.add(httpRequest)
    const survey = await collection.findOne({
      question: httpRequest.question
    })

    expect(survey).toBeTruthy()
  })
})
