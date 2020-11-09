export interface ISurveyAnswer {
  image?: string
  answer: string
}

export interface IAddSurveyModel {
  [field: string]: string | boolean | object
  question: string
  answers: ISurveyAnswer[]
}

export interface IAddSurvey {
  add: (surveyData: IAddSurveyModel) => Promise<void>
}
