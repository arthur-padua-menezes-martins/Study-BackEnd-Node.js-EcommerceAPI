import {
  IAddSurveyRepository
} from '../../../../../data/protocols/repository/survey/write/add-survey-repository'
import {
  IAddSurveyModel
} from '../../../../../domain/usecases/survey/write/add-survey'
import {
  MongoHelper
} from '../import-all'
import env from '../../../../../main/config/env'

export class SurveyMongoRepositoryWrite implements IAddSurveyRepository {
  async add (surveyData: IAddSurveyModel): Promise<void> {
    const collection = await MongoHelper.getCollection(env.collections.surveys)

    await collection.insertOne(surveyData)
  }
}
