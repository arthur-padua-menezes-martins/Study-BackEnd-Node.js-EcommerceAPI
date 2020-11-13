import { DatabaseAddSurveyController } from '../../../../../data/usecases/survey/write/add-survey/db-write-add-survey'
import { SurveyMongoRepositoryWrite } from '../../../../../infra/db/mongodb/survey/write/write-survey-mongo-repository'

const surveyRepositoryWrite = new SurveyMongoRepositoryWrite()
export const writeSurvey = new DatabaseAddSurveyController(surveyRepositoryWrite)
