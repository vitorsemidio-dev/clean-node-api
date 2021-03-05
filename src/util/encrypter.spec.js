const bcrypt = require('bcrypt')

const makeSut = () => {
  class Encrypter {
    async compare (value, hash) {
      const isValid = await bcrypt.compare(value, hash)
      return isValid
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

  test('Should return false if bcrypt returns false', async () => {
    bcrypt.isValid = false
    const { sut } = makeSut()

    const isValid = await sut.compare('value', 'hashed_value')

    expect(isValid).toBe(false)
  })
})
