jest.mock('bcrypt', () => ({
  isValid: true,

  async compare (value, hash) {
    this.value = value
    this.hash = hash
    return this.isValid
  }
}))

const bcrypt = require('bcrypt')

const Encrypter = require('./encrypter')
const MissingParamError = require('./errors/missing-param-error')

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

  test('Should throws if no params are provided', async () => {
    const { sut } = makeSut()

    const promiseWithoutValue = sut.compare()
    const promiseWithoutHash = sut.compare('value')

    expect(promiseWithoutValue).rejects.toThrow(new MissingParamError('value'))
    expect(promiseWithoutHash).rejects.toThrow(new MissingParamError('hash'))
  })
})
