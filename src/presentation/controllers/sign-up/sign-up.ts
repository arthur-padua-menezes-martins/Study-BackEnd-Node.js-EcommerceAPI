import { IHttpRequest, IHttpResponse, IAddAccount } from './sign-up-protocols'
import { FieldValidationWithRegex } from '../../regEx/field-validation'
import { ok, badRequest, serverError } from '../../helpers/export-all'
import { MissingParamError, InvalidParamError } from '../../errors/export-all'
import { httpRequestBodyFields, httpRequestBodyAddressFields } from '../../../utils/fake-data/httpRequest'

export class SignUpController {
  private readonly addAccount
  private readonly fieldValidationWithRegex

  constructor (addAccount: IAddAccount, fieldValidationWithRegex: FieldValidationWithRegex) {
    this.addAccount = addAccount
    this.fieldValidationWithRegex = fieldValidationWithRegex
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse | any> {
    try {
      var missingFields: string = ''
      var typeofIsString: boolean[] = []

      for (const field of httpRequestBodyFields) {
        missingFields += !(field in httpRequest.body) ? `${field} ` : ''
        typeofIsString.push(typeof httpRequest.body[field] === 'string' && true)
      }
      if (typeof httpRequest.body.address !== 'undefined') {
        for (const addressField of httpRequestBodyAddressFields) {
          missingFields += !(addressField in httpRequest.body.address) ? `${addressField} ` : ''
          typeofIsString.push(typeof httpRequest.body.address[addressField] === 'string' && true)
        }
      } else {
        for (const addressField of httpRequestBodyAddressFields) {
          missingFields += `${addressField} `
        }
      }

      if (missingFields) {
        return badRequest({}, '', new MissingParamError(missingFields))
      }

      if (!typeofIsString.every(isString => Boolean(isString))) {
        return serverError()
      }

      const { password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest({}, '', new InvalidParamError('passwordConfirmation'))
      }

      let invalidFields: string[] = []
      for (const field of httpRequestBodyFields) {
        invalidFields.push(await this.fieldValidationWithRegex.options(field, httpRequest.body[field]))
      }
      for (const field of httpRequestBodyAddressFields) {
        invalidFields.push(await this.fieldValidationWithRegex.options(field, httpRequest.body[field]))
      }
      invalidFields = (invalidFields.filter(field => field !== ''))
      if (invalidFields.length > 0) {
        return badRequest({}, '', null, invalidFields)
      }

      const { name, email, address } = httpRequest.body
      if (name && email && password && passwordConfirmation && address) {
        const newAccount = await this.addAccount.add({
          name,
          email,
          password,
          passwordConfirmation,
          address
        })

        return ok(newAccount)
      }
    } catch (error) {
      return serverError()
    }
  }
}
