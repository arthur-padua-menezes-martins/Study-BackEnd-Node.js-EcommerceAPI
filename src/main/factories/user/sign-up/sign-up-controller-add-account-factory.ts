import { DatabaseAddAccountController } from '../../../../data/usecases/account/write/add-account/db-write-add-account'
import { BcryptAdapter } from '../../../../infra/criptography/adapter/bcrypt/bcrypt-adapter'
import { AccountMongoRepositoryWrite } from '../../../../infra/db/mongodb/account/write/write-account-mongo-repository'

const encrypter = new BcryptAdapter(12)
const accountRepositoryWrite = new AccountMongoRepositoryWrite()
export const writeAccount = new DatabaseAddAccountController(encrypter, accountRepositoryWrite)
