import request from 'supertest'
import { sign } from 'jsonwebtoken'
import {
  Collection
} from 'mongodb'
import app from '../../../config/app'
import {
  MongoHelper
} from '../../../../infra/db/mongo/driver/mongoose/helper/mongo-helper'
import {
  informationsOfAddSurveyHttpRequest,
  informationsOfAccountModel
} from './survey-routes-utils'
import env from '../../../config/env'

let surveysCollection: Collection
let accountsCollection: Collection

describe('survey routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrlLocalhost)
  })
  beforeAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    surveysCollection = await MongoHelper.getCollection(env.collections.surveys)
    accountsCollection = await MongoHelper.getCollection(env.collections.accounts)
    await surveysCollection.deleteMany({})
    await accountsCollection.deleteMany({})
  })

  test('should return 403 on add survey with valid accessToken', async () => {
    await request(app)
      .post('/api/add-survey')
      .send({ survey: informationsOfAddSurveyHttpRequest.body })
      .expect(403)
  })

  test('should return 204 on add survey with valid accessToken', async () => {
    const account = await accountsCollection.insertOne({
      ...informationsOfAccountModel.enabled,
      role: 'administrator'
    })

    const id = account.ops[0]._id
    const accessToken = sign({ id }, env.jwtSecret)

    await accountsCollection.updateOne(
      { _id: id }, { $set: { accessToken } }
    )

    await request(app)
      .post('/api/add-survey')
      .set('x-access-token', accessToken)
      .send({ survey: informationsOfAddSurveyHttpRequest.body })
      .expect(204)
  })
})
