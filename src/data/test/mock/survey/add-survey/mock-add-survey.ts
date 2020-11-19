import {
  IAddSurveyRepository, IAddSurveyModel
} from './mock-add-survey-components'

export const mockWriteSurvey = async (): Promise<IAddSurveyRepository> => {
  class WriteSurveyStub implements IAddSurveyRepository {
    async add (surveyData: IAddSurveyModel): Promise<void> {

    }
  }

  return new WriteSurveyStub()
}
