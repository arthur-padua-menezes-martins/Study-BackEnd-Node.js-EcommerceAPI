import {
  IHttpRequest, IHttpResponse
} from '../../../protocols/export-all'

export {
  IHttpRequest, IHttpResponse
}
export {
  IController
} from '../../../protocols/export-all'
export {
  IValidation
} from '../../../protocols/validation/validation'
export {
  IAddSurvey
} from '../../../../domain/usecases/survey/write/add-survey'

export interface IDefineProperties {
  answers: IHttpRequest['body']['survey']['answers']
  question: IHttpRequest['body']['survey']['question']
  generateTypes: Generator<string, any, unknown>
  generatedType: IteratorResult<string, any>
  validation: {
    content: string[]
    error: IHttpResponse | null
  }
}
