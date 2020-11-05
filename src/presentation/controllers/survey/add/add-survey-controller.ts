import {
  IController,
  IHttpRequest, IHttpResponse,
  IValidation,
  IAddSurvey
} from './add-survey-controller-protocols'
import {
  MissingParamError,
  badRequest, serverError
} from './add-survey-controller-helpers'

export class AddSurveyController implements IController {
  private readonly validate: any = {}

  /**
  * @param {ValidationComposite} validationComposite
  * implementation of the validation
  * @param {IAddSurvey} writeSurvey
  * implementation of the survey record manager
  */
  constructor (
    private readonly validationComposite: IValidation,
    private readonly writeSurvey: IAddSurvey
  ) {

  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { body } = httpRequest
      this.validate.body = body

      const missingFields: string[] = await this.handleValidate({ type: '' })
      if (missingFields.length > 0) {
        return badRequest({}, '', new MissingParamError(missingFields.join(' ')))
      }

      const { question, answers } = body
      await this.writeSurvey.add({
        question,
        answers
      })

      return badRequest()
    } catch (error) {
      return serverError(error)
    }
  }

  async handleValidate (content: {type: string}): Promise<any[]> {
    return await this.validationComposite.validate({
      type: content.type,
      body: this.validate.body
    })
  }
}
