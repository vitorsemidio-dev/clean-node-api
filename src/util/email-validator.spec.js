jest.mock('validator', () => ({
  isEmailValid: true,

  isEmail (email) {
    this.email = email
    return this.isEmailValid
  }
}
))

const validator = require('validator')

const EmailValidator = require('./email-validator')
const MissingParamError = require('./errors/missing-param-error')

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('Should return true if Validator returns true', () => {
    const sut = makeSut()

    const isEmailValid = sut.isValid('valid_email@mail.com')

    expect(isEmailValid).toBe(true)
  })

  test('Should return false if Validator returns false', () => {
    validator.isEmailValid = false
    const sut = makeSut()

    const isEmailValid = sut.isValid('invalid_email@mail.com')

    expect(isEmailValid).toBe(false)
  })

  test('Shoul call validator with correct email', () => {
    const sut = makeSut()

    sut.isValid('any_email@mail.com')

    expect(validator.email).toBe('any_email@mail.com')
  })

  test('Should throws if no email is provided', async () => {
    const sut = makeSut()

    expect(() => { sut.isValid() }).toThrow(new MissingParamError('email'))
  })
})
