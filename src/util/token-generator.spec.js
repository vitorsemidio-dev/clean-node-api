jest.mock('jsonwebtoken', () => ({
  token: 'any_token',

  sign (payload, secret) {
    this.payload = payload
    this.secret = secret
    return this.token
  }
}
))

const jwt = require('jsonwebtoken')

const TokenGenerator = require('./token-generator')
const MissingParamError = require('./errors/missing-param-error')

const makeTokenGenerator = () => {
  const tokenGeneratorSpy = new TokenGenerator('any_secret')

  return tokenGeneratorSpy
}

const makeSut = () => {
  const sut = makeTokenGenerator()

  return {
    sut
  }
}

describe('Token Generator', () => {
  test('Should return null if JWT returns null', async () => {
    jwt.token = null
    const { sut } = makeSut()

    const token = await sut.generate('any_id')

    expect(token).toBeNull()
  })

  test('Should return a token if JWT returns token', async () => {
    const { sut } = makeSut()

    const token = await sut.generate('any_id')

    expect(token).toBe(jwt.token)
  })

  test('Should call JWT with correct values', async () => {
    const { sut } = makeSut()

    await sut.generate('any_id')

    expect(jwt.payload).toEqual({
      _id: 'any_id'
    })
    expect(jwt.secret).toBe(sut.secret)
  })

  test('Should throws if no secret is provided', async () => {
    const sut = new TokenGenerator()

    const promise = sut.generate('any_id')

    expect(promise).rejects.toThrow(new MissingParamError('secret'))
  })

  test('Should throws if no id is provided', async () => {
    const { sut } = makeSut()

    const promise = sut.generate()

    expect(promise).rejects.toThrow(new MissingParamError('id'))
  })
})
