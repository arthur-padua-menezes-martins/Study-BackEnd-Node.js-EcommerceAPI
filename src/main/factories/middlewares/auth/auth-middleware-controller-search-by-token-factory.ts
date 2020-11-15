import {
  DatabaseSearchAccountByAccessToken
} from '../../../../data/usecases/account/read/search-account/by-access-token/db-read-search-account-by-access-token'
import {
  JwtAdapter
} from '../../../../infra/criptography/adapter/jwt/jwt-adapter'
import {
  AccountMongoRepositoryRead
} from '../../../../infra/db/mongo/account/read/read-account-mongo-repository'
import env from '../../../config/env'

const decrypter = new JwtAdapter(env.jwtSecret)
const accountMongoRepositoryRead = new AccountMongoRepositoryRead()
export const readAccount = new DatabaseSearchAccountByAccessToken(decrypter, accountMongoRepositoryRead)
