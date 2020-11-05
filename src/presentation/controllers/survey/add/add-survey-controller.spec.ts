import { AddSurveyController } from './add-survey-controller'
import {
  IHttpRequest, IHttpResponse,
  IValidation,
  IAddSurvey
} from './add-survey-controller-protocols'
import {
  validationCompositeStub,
  makeWriteSurvey
} from './add-survey-controller-make'
import {
  surveyHttpRequestBodyAdd
} from './add-survey-controller-helpers'

interface ISystemUnderTestTypes {
  systemUnderTest: AddSurveyController
  validationCompositeStub: IValidation
  writeSurveyStub: IAddSurvey
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const writeSurveyStub = await makeWriteSurvey()
  const systemUnderTest = new AddSurveyController(validationCompositeStub, writeSurveyStub)

  return {
    systemUnderTest,
    validationCompositeStub,
    writeSurveyStub
  }
}

const httpRequest: IHttpRequest = {
  body: {}
}
let httpResponse: IHttpResponse = {
  statusCode: Number(),
  body: Object()
}

describe('AddSurveyController', () => {
  test('should call validationComposite with correct values <version 0.0.1>', async () => {
    const { systemUnderTest, validationCompositeStub } = await makeSystemUnderTest()

    const spyOnValidate = jest.spyOn(validationCompositeStub, 'validate')

    httpRequest.body = surveyHttpRequestBodyAdd

    await systemUnderTest.handle(httpRequest)
    expect(spyOnValidate).toHaveBeenCalledWith({ type: '', body: httpRequest.body })
  })

  test('returns from httpResponse: "{statusCode: 400}" if any required fields belonging to httpRequest.body do not exist <version 0.0.1>', async () => {
    const { systemUnderTest, validationCompositeStub } = await makeSystemUnderTest()

    jest.spyOn(validationCompositeStub, 'validate').mockImplementationOnce(async () => {
      return ['question', 'answers']
    })

    httpResponse = await systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.errorMessage?.name).toBe('MissingParamError')
  })

  test('should call AddSurveyController with correct values <version 0.0.1>', async () => {
    const { systemUnderTest, writeSurveyStub } = await makeSystemUnderTest()
    const { question, answers } = httpRequest.body

    jest.spyOn(validationCompositeStub, 'validate').mockImplementationOnce(async () => {
      return []
    })

    const sypOnAdd = jest.spyOn(writeSurveyStub, 'add')

    httpResponse = await systemUnderTest.handle(httpRequest)
    expect(sypOnAdd).toHaveBeenCalledWith({
      question: question,
      answers: answers
    })
  })
})
