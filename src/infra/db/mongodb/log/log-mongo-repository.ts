import { LogErrorMongoRepository } from './error/log-error-mongo-repository'
import {
  applyMixins
} from './import-all'

export interface LogMongoRepository extends LogErrorMongoRepository {}
export class LogMongoRepository implements LogMongoRepository {}

applyMixins(LogMongoRepository, [
  LogErrorMongoRepository
])
