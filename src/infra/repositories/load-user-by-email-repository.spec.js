const MongoHelper = require('../helpers/mongo-helper')

const MissingParamError = require('../../util/errors/missing-param-error')

const LoadUserByEmailRepository = require('./load-user-by-email-repository')

let userModel

const makeSut = () => {
  const sut = new LoadUserByEmailRepository()

  return {
    sut
  }
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return null if no user is found', async () => {
    const { sut } = makeSut()

    const user = await sut.load('invalid_email@mail.com')

    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const { sut } = makeSut()

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

  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()

    const promise = sut.load()

    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})
