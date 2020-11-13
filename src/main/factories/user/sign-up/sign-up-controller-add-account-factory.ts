import { DatabaseAddAccountController } from '../../../../data/usecases/account/write/add-account/db-write-add-account'
import { AccountMongoRepositoryRead } from '../../../../infra/db/mongo/account/read/read-account-mongo-repository'
import { BcryptAdapter } from '../../../../infra/criptography/adapter/bcrypt/bcrypt-adapter'
import { AccountMongoRepositoryWrite } from '../../../../infra/db/mongo/account/write/write-account-mongo-repository'

const accountRepositoryRead = new AccountMongoRepositoryRead()
const encrypter = new BcryptAdapter(12)
const accountRepositoryWrite = new AccountMongoRepositoryWrite()
export const writeAccount = new DatabaseAddAccountController(accountRepositoryRead, encrypter, accountRepositoryWrite)
