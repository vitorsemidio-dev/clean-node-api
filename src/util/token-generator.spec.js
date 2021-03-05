const makeTokenGenerator = () => {
  class TokenGeneratorSpy {
    async generate (id) {
      return null
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
    const { sut } = makeSut()

    const token = await sut.generate('any_id')

    expect(token).toBeNull()
  })
})
