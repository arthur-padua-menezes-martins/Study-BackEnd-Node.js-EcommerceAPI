import {
  IAddSurveyRepository
} from '../../../../protocols/repository/survey/write/add-survey-repository'
import {
  IAddSurvey, IAddSurveyModel
} from './db-write-add-survey-protocols'

export class DatabaseAddSurveyController implements IAddSurvey {
  constructor (
    private readonly surveyRepositoryRead: IAddSurveyRepository
  ) {

  }

  async add (surveyData: IAddSurveyModel): Promise<void> {
    await this.surveyRepositoryRead.add(surveyData)
  }
}
