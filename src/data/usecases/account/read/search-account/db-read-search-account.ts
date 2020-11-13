import {
  DatabaseSearchAccountByAccessToken
} from './by-access-token/db-read-search-account-by-access-token'
import {
  DatabaseSearchAccountByField
} from './by-field/db-read-search-account-by-field'
import {
  applyMixins
} from '../../import-all'

export interface DatabaseSearchAccountController extends DatabaseSearchAccountByAccessToken, DatabaseSearchAccountByField {}
export class DatabaseSearchAccountController implements DatabaseSearchAccountController {}

applyMixins(DatabaseSearchAccountController, [
  DatabaseSearchAccountByAccessToken,
  DatabaseSearchAccountByField
])
