import { AddSurveyController } from './add-survey-controller'
import {
  IHttpResponse,
  IValidation,
  IAddSurvey
} from './add-survey-controller-protocols'
import {
  makeWriteSurvey
} from './add-survey-controller-make'
import {
  validationCompositeStub
} from './add-survey-controller-components'
import {
  fakeDataAddSurveyHttpRequestBody
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

const httpRequest: any = {
  body: {
    survey: fakeDataAddSurveyHttpRequestBody
  }
}
let httpResponse: IHttpResponse = {
  statusCode: Number(),
  body: Object()
}

describe('AddSurveyController', () => {
  test('returns error if validation throws error <version 0.0.1>', async () => {
    const { systemUnderTest, validationCompositeStub } = await makeSystemUnderTest()

    jest.spyOn(validationCompositeStub, 'validate').mockImplementationOnce(async () => {
      throw new Error()
    })

    const response = await systemUnderTest.handle(httpRequest)
    await expect(response.statusCode).toBe(500)
    await expect(response.errorMessage?.name).toBe('ServerError')
  })

  test('should call validationComposite with correct values <version 0.0.1>', async () => {
    const { systemUnderTest, validationCompositeStub } = await makeSystemUnderTest()
    const { answers, question } = httpRequest.body.survey

    const spyOnValidate = jest.spyOn(validationCompositeStub, 'validate')

    await systemUnderTest.handle(httpRequest)
    expect(spyOnValidate).toHaveBeenCalledWith({
      type: '',
      body: { ...answers, question }
    })
  })

  test('returns from httpResponse: "{statusCode: 400}" if any validation fails <version 0.0.1>', async () => {
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
    const { question, answers } = httpRequest.body.survey

    jest.spyOn(validationCompositeStub, 'validate').mockImplementationOnce(async () => {
      return []
    })

    const sypOnAdd = jest.spyOn(writeSurveyStub, 'add')

    httpResponse = await systemUnderTest.handle(httpRequest)
    expect(sypOnAdd).toHaveBeenCalledWith({
      question,
      answers
    })
  })
})
