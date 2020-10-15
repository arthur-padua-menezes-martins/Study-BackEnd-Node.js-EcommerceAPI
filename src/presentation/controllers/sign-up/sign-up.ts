import { IHttpRequest, IHttpResponse, IAddAccount } from './sign-up-protocols'
import { MissingParamError, InvalidParamError } from '../../errors/export-all'
import { RegExpFieldValidation } from '../../regExp/field-validation'
import {
  httpRequestBodyFields, httpRequestBodyAddressFields,
  badRequest, serverError
} from '../../helpers/export-all'

export class SignUpController {
  private readonly addAccount

  constructor (addAccount: IAddAccount) {
    this.addAccount = addAccount
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse | any> {
    try {
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

      const regExpFieldValidation = new RegExpFieldValidation()
      let invalidFields: string[] = []
      for (const field of httpRequestBodyFields) {
        invalidFields.push(await regExpFieldValidation.options(field, httpRequest.body[field]))
      }
      for (const field of httpRequestBodyAddressFields) {
        invalidFields.push(await regExpFieldValidation.options(field, httpRequest.body[field]))
      }
      invalidFields = (invalidFields.filter(field => field !== undefined))
      if (invalidFields.length > 0) {
        return badRequest({}, '', null, invalidFields)
      }

      const { name, email, address } = httpRequest.body
      const httpRequestBodyValid = {
        name,
        email,
        password,
        passwordConfirmation,
        address
      }
      this.addAccount.add(httpRequestBodyValid)
    } catch (error) {
      return serverError()
    }
  }
}
