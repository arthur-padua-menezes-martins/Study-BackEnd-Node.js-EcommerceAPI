import { DatabaseSearchAccountController } from '../../../../data/usecases/account/read/search-account/db-read-search-account'
import { AccountMongoRepositoryRead } from '../../../../infra/db/mongodb/account/read/account-mongo-repository-read'

const accountRepositoryRead = new AccountMongoRepositoryRead()
export const searchAccount = new DatabaseSearchAccountController(accountRepositoryRead)
