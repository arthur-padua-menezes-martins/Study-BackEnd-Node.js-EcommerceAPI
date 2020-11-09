import { IValidation } from '../../protocols/validation/validation'
import { IHttpRequestBody } from '../../protocols/http/request/http-request-body'

interface IValidationCompositeComponents {
  content: any
  type: string
}
interface IValidationCompositeParams {
  type: string
  fields?: string[] | [string[], string[]]
  body?: IHttpRequestBody
  checkThisType?: string
  checkTheTypeOfThis?: object
  checkThis?: string
  withThis?: string
}
export class ValidationComposite implements IValidation {
  private readonly types: string[] = ['validate_fields', 'required_fields', 'compare_fields', 'verify_types']
  private readonly validateFields: any
  private readonly requiredFields: any
  private readonly compareFields: any
  private readonly verifyTypes: any

  constructor (components: IValidationCompositeComponents[]) {
    for (const component of components) {
      if (component.type === 'validate_fields') {
        this.validateFields = component.content
      } else if (component.type === 'required_fields') {
        this.requiredFields = component.content
      } else if (component.type === 'compare_fields') {
        this.compareFields = component.content
      } else if (component.type === 'verify_types') {
        this.verifyTypes = component.content
      }
    }
  }

  async validate (input: IValidationCompositeParams): Promise<any> {
    const { type } = input

    if (type === 'validate_fields') {
      return this.validateFields.validate(input)
    } else if (type === 'required_fields') {
      return this.requiredFields.validate(input)
    } else if (type === 'compare_fields') {
      return this.compareFields.validate(input)
    } else if (type === 'verify_types') {
      return this.verifyTypes.validate(input)
    }
  }
}
