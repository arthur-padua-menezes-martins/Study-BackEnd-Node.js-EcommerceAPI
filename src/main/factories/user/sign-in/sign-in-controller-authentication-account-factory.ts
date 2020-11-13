import { DatabaseAccountAuthenticationController } from '../../../../data/usecases/account/authentication/db-account-authentication'
import { AccountMongoRepositoryRead } from '../../../../infra/db/mongo/account/read/read-account-mongo-repository'
import { AccountMongoRepositoryUpdate } from '../../../../infra/db/mongo/account/update/update-account-mongo-repository'
import { BcryptAdapter } from '../../../../infra/criptography/adapter/bcrypt/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/adapter/jwt/jwt-adapter'
import env from '../../../config/env'

const accountRepositoryRead = new AccountMongoRepositoryRead()
const bcryptAdapter = new BcryptAdapter(12)
const jwtAdapter = new JwtAdapter(env.jwtSecret)
const accountRepositoryUpdate = new AccountMongoRepositoryUpdate()

export const accountAuthentication = new DatabaseAccountAuthenticationController(
  accountRepositoryRead, bcryptAdapter, jwtAdapter, accountRepositoryUpdate
)
