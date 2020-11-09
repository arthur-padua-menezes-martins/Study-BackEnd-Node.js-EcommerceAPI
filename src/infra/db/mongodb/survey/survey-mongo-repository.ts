import {
  SurveyMongoRepositoryWrite
} from './export-all'
import {
  applyMixins
} from './import-all'

export interface SurveyMongoRepository extends SurveyMongoRepositoryWrite {}
export class SurveyMongoRepository implements SurveyMongoRepository {
}

applyMixins(SurveyMongoRepository, [
  SurveyMongoRepositoryWrite
])
