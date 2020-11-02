import { DatabaseAuthenticationController } from '../../../../data/usecases/authentication/db-authentication'
import { AccountMongoRepositoryRead } from '../../../../infra/db/mongodb/account/read/account-mongo-repository-read'
import { AccountMongoRepositoryUpdate } from '../../../../infra/db/mongodb/account/update/account-mongo-repository-update'
import { BcryptAdapter } from '../../../../infra/criptography/adapter/bcrypt/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/adapter/jwt/jwt-adapter'
import env from '../../../../main/config/env'

const accountRepositoryRead = new AccountMongoRepositoryRead()
const accountRepositoryUpdate = new AccountMongoRepositoryUpdate()
const bcryptAdapter = new BcryptAdapter(12)
const jwtAdapter = new JwtAdapter(env.jwtSecret)

export const authentication = new DatabaseAuthenticationController(
  accountRepositoryRead, bcryptAdapter, jwtAdapter, accountRepositoryUpdate
)
