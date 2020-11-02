import { DatabaseAddAccountController } from '../../../../data/usecases/account/write/add-account/db-write-add-account'
import { BcryptAdapter } from '../../../../infra/criptography/adapter/bcrypt/bcrypt-adapter'
import { AccountMongoRepositoryWrite } from '../../../../infra/db/mongodb/account/write/account-mongo-repository-write'

const encrypter = new BcryptAdapter(12)
const accountRepositoryWrite = new AccountMongoRepositoryWrite()
export const addAccount = new DatabaseAddAccountController(encrypter, accountRepositoryWrite)
