import {
  SuperClassAddSurveyController
} from '../super/super-class-controller'
import {
  IController,
  IHttpRequest, IHttpResponse,
  IValidation,
  IAddSurvey
} from './add-survey-controller-protocols'
import {
  MissingParamError,
  noContent, badRequest, serverError
} from './add-survey-controller-helpers'

interface IDefineProperties {
  answers: IHttpRequest['body']['survey']['answers']
  question: IHttpRequest['body']['survey']['question']
  generateTypes: Generator<string, any, unknown>
  generatedType: IteratorResult<string, any>
  validation: {
    content: string[]
    error: IHttpResponse | null
  }
}
export class AddSurveyController extends SuperClassAddSurveyController implements IController {
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
    super()

    this.content = {
      validationTypes: ['']
    }
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      let { answers, question, generateTypes, generatedType, validation } = await this.defineProperties(httpRequest)

      do {
        validation.content = await this.handleValidate({ type: generatedType.value })

        if (validation.content.length > 0) {
          validation.error = badRequest(undefined, undefined, new MissingParamError(validation.content.join(' ')), validation.content)

          break
        }

        generatedType = generateTypes.next()
      } while (!(generatedType.done))

      if (validation.error) {
        return validation.error
      }

      await this.writeSurvey.add({
        question,
        answers
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  async defineProperties (httpRequest: IHttpRequest): Promise<IDefineProperties> {
    const { answers, question } = httpRequest.body.survey
    const generateTypes: Generator<string> = (this.generateTypes(this.content.validationTypes, 0))()

    this.handleValidate = async (content: { type: string }) => {
      return await this.validationComposite.validate({
        type: content.type,
        body: { ...answers, question }
      })
    }

    return {
      answers,
      question,
      generateTypes: generateTypes,
      generatedType: generateTypes.next(),
      validation: {
        content: [],
        error: null
      }
    }
  }
}
