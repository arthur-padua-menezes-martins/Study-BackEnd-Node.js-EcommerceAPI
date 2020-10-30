import { Validation } from '../../protocols/validation/validation'
import { IHttpRequestBody } from '../../protocols/http'

interface IValidationComponents {
  content: any
  type: string
}
interface IInputContent {
  type: string
  fields?: string[] | [string[], string[]]
  body?: IHttpRequestBody
  checkThisType?: string
  checkTheTypeOfThis?: object
  checkThis?: any
  withThis?: any
}
export class ValidationComposite implements Validation {
  public readonly validateFields: any
  private readonly requiredFields: any
  private readonly compareFields: any
  private readonly verifyTypes: any

  constructor (validationComponents: IValidationComponents[]) {
    for (const validationComponent of validationComponents) {
      if (validationComponent.type === 'validate fields') {
        this.validateFields = validationComponent.content
      } else if (validationComponent.type === 'required fields') {
        this.requiredFields = validationComponent.content
      } else if (validationComponent.type === 'compare fields') {
        this.compareFields = validationComponent.content
      } else if (validationComponent.type === 'verify types') {
        this.verifyTypes = validationComponent.content
      }
    }
  }

  async validate (input: IInputContent): Promise<any> {
    const { type } = input

    if (type === 'validate fields') {
      return this.validateFields.validate(input)
    } else if (type === 'required fields') {
      return this.requiredFields.validate(input)
    } else if (type === 'compare fields') {
      return this.compareFields.validate(input)
    } else if (type === 'verify types') {
      return this.verifyTypes.validate(input)
    }
  }
}
