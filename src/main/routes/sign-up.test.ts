import request from 'supertest'
import app from '../config/app'
import { mongoHelper } from '../../infra/db/mongodb/helper/mongo-helper'
import { httpRequestBodyMatchComplete } from '../../utils/fake-data/httpRequest'

describe('signUp Routes', () => {
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

  test('Should return an account on succes', async () => {
    await request(app)
      .post('/api/signup')
      .send(httpRequestBodyMatchComplete)
      .expect({ statusCode: 200 })
  })
})
