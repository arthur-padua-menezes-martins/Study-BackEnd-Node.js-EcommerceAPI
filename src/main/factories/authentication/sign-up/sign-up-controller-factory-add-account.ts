import { DatabaseAddAccountController } from '../../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../../infra/criptography/adapter/bcrypt/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'

const encrypter = new BcryptAdapter(12)
const addAccountRepository = new AccountMongoRepository()
export const addAccount = new DatabaseAddAccountController(encrypter, addAccountRepository)
