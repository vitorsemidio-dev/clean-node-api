const makeSut = () => {
  class Encrypter {
    async compare (value, hash) {
      return true
    }
  }

  const sut = new Encrypter()

  return {
    sut
  }
}

describe('Encrypter', () => {
  test('Should return true if bcrypt returns true', async () => {
    const { sut } = makeSut()

    const isValid = await sut.compare('value', 'hashed_value')

    expect(isValid).toBe(true)
  })
})
