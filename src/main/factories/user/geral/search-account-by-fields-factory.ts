import { DatabaseSearchAccountController } from '../../../../data/usecases/account/read/search-account/db-read-search-account'
import { AccountMongoRepositoryRead } from '../../../../infra/db/mongodb/account/read/read-account-mongo-repository'

const accountRepositoryRead = new AccountMongoRepositoryRead()
export const readAccount = new DatabaseSearchAccountController(accountRepositoryRead)
