import {
  AccountMongoRepositoryWrite,
  AccountMongoRepositoryRead,
  AccountMongoRepositoryUpdate
} from './export-all'
import {
  applyMixins
} from './import-all'

export interface AccountMongoRepository extends AccountMongoRepositoryWrite, AccountMongoRepositoryRead, AccountMongoRepositoryUpdate {}
export class AccountMongoRepository implements AccountMongoRepository {}

applyMixins(AccountMongoRepository, [
  AccountMongoRepositoryWrite,
  AccountMongoRepositoryRead,
  AccountMongoRepositoryUpdate
])
