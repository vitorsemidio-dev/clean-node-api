const bcrypt = require('bcrypt')
const Encrypter = require('./encrypter')

const makeSut = () => {
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

  test('Should call bcrypt with correct values', async () => {
    const { sut } = makeSut()

    await sut.compare('value', 'hashed_value')

    expect(bcrypt.value).toBe('value')
    expect(bcrypt.hash).toBe('hashed_value')
  })
})
