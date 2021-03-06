const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('./config/env')

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    const app = require('./config/app')

    app.listen(3333, () => console.log('Server is running on http://localhost:3333'))
  }).catch(console.error)
