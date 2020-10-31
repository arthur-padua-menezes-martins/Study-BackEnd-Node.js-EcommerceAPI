import request from 'supertest'
import app from '../../config/app'

describe('content-type Middleware', () => {
  test('Should return default content-type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send({})
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  test('Should return default content-type as javascript', async () => {
    app.get('/test_content_type_javascript', (req, res) => {
      res.type('application/javascript')
      res.send({})
    })

    await request(app)
      .get('/test_content_type_javascript')
      .expect('content-type', /javascript/)
  })
})
