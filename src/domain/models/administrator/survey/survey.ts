export interface ISurveyModel {
  [field: string]: string | object | boolean
  answers: [{
    [field: string]: string
    image: string
    answer: string
  }]
  id: string
}
