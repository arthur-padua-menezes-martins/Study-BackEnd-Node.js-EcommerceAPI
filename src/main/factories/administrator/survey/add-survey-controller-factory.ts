import { IController, AddSurveyController } from './import-all'
import { surveyValidation } from './add-survey/add-survey-controller-validation-composite-factory'
import { writeSurvey } from './add-survey/add-survey-controller-add-survey-factory'
import { makeLogErrorControllerDecorator } from '../../decorators/log/error/log-error-controller-decorator-factory'

export const makeAddSurveyController = (): IController => {
  return makeLogErrorControllerDecorator(
    new AddSurveyController(
      surveyValidation,
      writeSurvey
    )
  )
}
