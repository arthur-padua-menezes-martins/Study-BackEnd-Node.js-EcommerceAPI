import request from 'supertest'
import app from '../config/app'
import { httpRequestBodyMatchComplete } from '../../utils/fake-data/httpRequest'

describe('signUp Routes', () => {
  test('Should return an account on succes', async () => {
    await request(app)
      .post('/api/signup')
      .send(httpRequestBodyMatchComplete)
      .expect({ statusCode: 200 })
  })
})
