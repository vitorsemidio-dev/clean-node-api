const jwt = require('jsonwebtoken')

const makeTokenGenerator = () => {
  class TokenGeneratorSpy {
    async generate (id) {
      return jwt.sign(id, 'secret')
    }
  }
  const tokenGeneratorSpy = new TokenGeneratorSpy()

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
})
