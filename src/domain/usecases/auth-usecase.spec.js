const { MissingParamError } = require('../../util/errors')

class AuthUseCase {
  async auth (email) {
    if (!email) {
      throw new MissingParamError('email')
    }
  }
}

describe('Auth UseCase', () => {
  test('Should return null if no email is provided', async () => {
    const sut = new AuthUseCase()

    const promise = sut.auth()

    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})