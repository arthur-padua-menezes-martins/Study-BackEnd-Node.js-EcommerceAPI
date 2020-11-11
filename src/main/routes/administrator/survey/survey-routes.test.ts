import request from 'supertest'
import {
  Collection
} from 'mongodb'
import app from '../../../config/app'
import {
  MongoHelper
} from '../../../../infra/db/mongodb/helper/mongo-helper'
import {
  informationsOfAddSurveyHttpRequestBody
} from '../../../../utils/fake/data/survey/add/fake-data-add-survey-http-request-body'
import env from '../../../config/env'

let collection: Collection

describe('survey routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrlLocalhost)
  })
  beforeAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    collection = await MongoHelper.getCollection(env.collections.surveys)
    await collection.deleteMany({})
  })

  test('should return 204 on add-survey success', async () => {
    await request(app)
      .post('/add-survey')
      .send({
        survey: informationsOfAddSurveyHttpRequestBody
      })
      .expect(204)
  })
})
