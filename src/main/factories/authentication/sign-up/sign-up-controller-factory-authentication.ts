import { DatabaseAuthenticationController } from '../../../../data/usecases/authentication/db-authentication'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../../infra/criptography/adapter/bcrypt/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/adapter/jwt/jwt-adapter'
import env from '../../../config/env'

const accountMongoRepository = new AccountMongoRepository()
const bcryptAdapter = new BcryptAdapter(12)
const jwtAdapter = new JwtAdapter(env.jwtSecret)

export const authentication = new DatabaseAuthenticationController(
  accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository
)
