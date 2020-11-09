import {
  IAddSurveyRepository, IAddSurveyModel
} from './make-add-survey-components'

export const makeWriteSurvey = async (): Promise<IAddSurveyRepository> => {
  class WriteSurveyStub implements IAddSurveyRepository {
    async add (surveyData: IAddSurveyModel): Promise<void> {

    }
  }

  return new WriteSurveyStub()
}
