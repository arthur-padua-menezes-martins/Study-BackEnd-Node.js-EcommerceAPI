import {
  DatabaseAddSurveyController
} from './db-write-add-survey'
import {
  IAddSurveyRepository
} from './db-write-add-survey-protocols'
import {
  mockWriteSurvey
} from './db-write-add-survey-make'
import {
  informationsOfAddSurveyHttpRequest
} from './db-write-add-survey-utils'

interface ISystemUnderTestTypes {
  systemUnderTest: DatabaseAddSurveyController
  writeSurveyStub: IAddSurveyRepository
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const writeSurveyStub = await mockWriteSurvey()
  const systemUnderTest = new DatabaseAddSurveyController(writeSurveyStub)

  return {
    systemUnderTest,
    writeSurveyStub
  }
}

const httpRequest = informationsOfAddSurveyHttpRequest.body

describe('DatabaseAddSurveyController', () => {
  test('should call AddSurveyRepository with correct values <version: 0.0.1>', async () => {
    const { systemUnderTest, writeSurveyStub } = await makeSystemUnderTest()

    const spyOnAdd = jest.spyOn(writeSurveyStub, 'add')

    await systemUnderTest.add(httpRequest)
    expect(spyOnAdd).toHaveBeenCalledWith(httpRequest)
  })

  test('returns error if writeSurvey throws <version: 0.0.1>', async () => {
    const { systemUnderTest, writeSurveyStub } = await makeSystemUnderTest()

    jest.spyOn(writeSurveyStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))

    const httpResponse = systemUnderTest.add(httpRequest)
    await expect(httpResponse).rejects.toThrow()
  })
})
