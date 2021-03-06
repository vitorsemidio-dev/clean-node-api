const request = require('supertest')

const app = require('./app')

describe('App Setup', () => {
  test('Should disable X-Powered-By', async () => {
    app.get('/test-x-powered-by', (req, res) => {
      res.send('')
    })

    const response = await request(app).get('/test-x-powered-by')

    expect(response.headers['x-powered-by']).toBeUndefined()
  })
})
