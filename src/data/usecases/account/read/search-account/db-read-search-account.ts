import {
  DatabaseSearchAccountByAccessToken
} from './by-access-token/db-read-search-account-by-access-token'
import {
  DatabaseSearchAccountByFields
} from './by-field/db-read-search-account-by-fields'
import {
  applyMixins
} from '../../import-all'

export interface DatabaseSearchAccountController extends DatabaseSearchAccountByAccessToken, DatabaseSearchAccountByFields {}
export class DatabaseSearchAccountController implements DatabaseSearchAccountController {}

applyMixins(DatabaseSearchAccountController, [
  DatabaseSearchAccountByAccessToken,
  DatabaseSearchAccountByAccessToken
])
