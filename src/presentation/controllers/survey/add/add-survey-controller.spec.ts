import { AddSurveyController } from './add-survey-controller'
import {
  IHttpResponse,
  IValidation,
  IAddSurvey
} from './add-survey-controller-protocols'
import {
  mockWriteSurvey
} from './add-survey-controller-mock'
import {
  validationCompositeStub
} from './add-survey-controller-components'
import {
  informationsOfAddSurveyHttpRequest
} from './add-survey-controller-utils'

interface ISystemUnderTestTypes {
  systemUnderTest: AddSurveyController
  validationCompositeStub: IValidation
  writeSurveyStub: IAddSurvey
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const writeSurveyStub = await mockWriteSurvey()
  const systemUnderTest = new AddSurveyController(validationCompositeStub, writeSurveyStub)

  return {
    systemUnderTest,
    validationCompositeStub,
    writeSurveyStub
  }
}

const httpRequest: any = {
  body: {
    survey: informationsOfAddSurveyHttpRequest.body
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

    const httpResponse = await systemUnderTest.handle(httpRequest)
    await expect(httpResponse.statusCode).toBe(500)
    await expect(httpResponse.errorMessage?.name).toBe('ServerError')
  })

  test('should call validationComposite with correct values <version 0.0.1>', async () => {
    const { systemUnderTest, validationCompositeStub } = await makeSystemUnderTest()
    const { question, answers } = httpRequest.body.survey

    const spyOnValidate = jest.spyOn(validationCompositeStub, 'validate')

    await systemUnderTest.handle(httpRequest)
    expect(spyOnValidate).toHaveBeenCalledWith({
      type: 'required_fields',
      fields: informationsOfAddSurveyHttpRequest.fields.concat(informationsOfAddSurveyHttpRequest.answersFields),
      body: { question, answers }
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

  test('returns from httpResponse: "{statusCode: 500}" if writeSurvey throws <version 0.0.1>', async () => {
    const { systemUnderTest, writeSurveyStub } = await makeSystemUnderTest()

    jest.spyOn(validationCompositeStub, 'validate').mockImplementationOnce(async () => {
      return []
    })

    jest.spyOn(writeSurveyStub, 'add').mockImplementationOnce(async () => {
      throw new Error()
    })

    const response = await systemUnderTest.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.errorMessage?.name).toBe('ServerError')
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
    expect(httpResponse.statusCode).toBe(204)
  })
})
