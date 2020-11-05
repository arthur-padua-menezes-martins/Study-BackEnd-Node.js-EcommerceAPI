import {
  IAddSurvey, IAddSurveyModel
} from './make-add-survey-components'

export const makeWriteSurvey = async (): Promise<any> => {
  class WriteSurveyStub implements IAddSurvey {
    async add (surveyData: IAddSurveyModel): Promise<void> {

    }
  }

  return new WriteSurveyStub()
}
