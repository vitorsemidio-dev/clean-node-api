const jwt = require('jsonwebtoken')

const makeTokenGenerator = () => {
  class TokenGeneratorSpy {
    constructor (secret) {
      this.secret = secret
    }

    async generate (id) {
      return jwt.sign(id, this.secret)
    }
  }
  const tokenGeneratorSpy = new TokenGeneratorSpy('any_secret')

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

    expect(jwt.id).toBe('any_id')
    expect(jwt.secret).toBe(sut.secret)
  })
})
