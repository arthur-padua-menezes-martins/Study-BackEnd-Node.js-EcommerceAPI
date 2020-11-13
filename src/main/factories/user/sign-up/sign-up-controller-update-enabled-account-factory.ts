import { DatabaseEnabledAccountController } from '../../../../data/usecases/account/update/enabled-account/db-update-enabled-account'
import { AccountMongoRepositoryUpdate } from '../../../../infra/db/mongo/account/update/update-account-mongo-repository'

const accountRepositoryUpdate = new AccountMongoRepositoryUpdate()
export const updateAccount = new DatabaseEnabledAccountController(accountRepositoryUpdate)
