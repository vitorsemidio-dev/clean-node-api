const LoginRouter = require('../../presentation/routers/login-router')
const AuthUseCase = require('../../domain/usecases/auth-usecase')
const EmailValidator = require('../../util/email-validator')
const LoadUserByEmailRepository = require('../../infra/repositories/load-user-by-email-repository')
const UpdateAccessTokenRepository = require('../../infra/repositories/update-access-token-repository')
const Encrypter = require('../../util/encrypter')
const TokenGenerator = require('../../util/token-generator')
const env = require('../config/env')

module.exports = class LoginRouterComposer {
  static compose () {
    const encrypter = new Encrypter()
    const tokenGenerator = new TokenGenerator(env.tokenSecret)
    const loadUserByEmailRepository = new LoadUserByEmailRepository()
    const updateAccessTokenRepository = new UpdateAccessTokenRepository()
    const emailValidator = new EmailValidator()
    const authUseCase = new AuthUseCase({
      loadUserByEmailRepository,
      updateAccessTokenRepository,
      encrypter,
      tokenGenerator
    })
    const loginRouter = new LoginRouter({
      authUseCase,
      emailValidator
    })

    return loginRouter
  }
}
