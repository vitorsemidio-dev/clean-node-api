const { MongoClient } = require('mongodb')

class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = await this.userModel.findOne(
      { email },
      {
        projection: {
          password: 1
        }
      }
    )
    return user
  }
}

let client, db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)

  return {
    sut,
    userModel
  }
};

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    db = client.db()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await client.close()
  })

  test('Should return null if no user is found', async () => {
    const { sut } = makeSut()

    const user = await sut.load('invalid_email@mail.com')

    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const { sut, userModel } = makeSut()

    const fakeUser = await userModel.insertOne({
      _id: 'any_id',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })

    const user = await sut.load('valid_email@mail.com')

    expect(user).toEqual({
      _id: fakeUser.ops[0]._id,
      password: fakeUser.ops[0].password
    })
  })
})
