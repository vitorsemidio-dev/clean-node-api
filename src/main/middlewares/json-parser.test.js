const request = require('supertest')

const app = require('../config/app')

describe('JSON Parser Middleware', () => {
  test('Should parser body as JSON', async () => {
    app.post('/test-json-parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test-json-parser')
      .send({
        name: 'Jane Doe'
      })
      .expect({
        name: 'Jane Doe'
      })
  })
})
