import { IHttpRequest, IHttpResponse } from './sign-up-protocols'
import { MissingParamError, InvalidParamError } from '../../errors/export-all'
import { badRequest } from '../../helpers/export-all'
import { RegExpFieldValidation } from '../../regExp/field-validation'

export class SignUpController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse | any> {
    const httpRequestBodyFields: string[] = ['name', 'email', 'password']
    const httpRequestBodyAddressFields: string[] = ['cep', 'street', 'number', 'neighborhood', 'city', 'state']
    var MissingFields: string = ''

    for (const field of httpRequestBodyFields) {
      MissingFields += !(field in httpRequest.body) ? `${field} ` : ''
    }
    if ('address' in httpRequest.body && httpRequest.body.address !== undefined) {
      for (const addressField of httpRequestBodyAddressFields) {
        MissingFields += !(addressField in httpRequest.body.address) ? `${addressField} ` : ''
      }
    }

    const { password, passwordConfirmation } = httpRequest.body
    if (password !== passwordConfirmation) {
      return badRequest({}, '', new InvalidParamError('passwordConfirmation'))
    }

    if (MissingFields !== '') {
      return badRequest({}, '', new MissingParamError(MissingFields))
    }

    const regExpFieldValidation = await new RegExpFieldValidation()
    const invalidFields: string[] = []
    for (const field of httpRequestBodyFields) {
      invalidFields.push(await regExpFieldValidation.options(field, httpRequest.body[field]))
    }
    for (const field of httpRequestBodyAddressFields) {
      invalidFields.push(await regExpFieldValidation.options(field, httpRequest.body[field]))
    }
    if (invalidFields.length > 0) {
      return badRequest({}, '', null, invalidFields)
    }
  }
}
