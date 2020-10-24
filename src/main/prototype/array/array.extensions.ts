/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-extend-native */
import { IHttpRequestBody } from '../../../presentation/protocols/http'

interface Array<Boolean> {
  typeOfIsNotString: (fields: string[], body: IHttpRequestBody) => boolean
}

Array.prototype.typeOfIsNotString = function (fields: string[], body: IHttpRequestBody): boolean {
  var typeOfIsNotString: boolean[] = []

  for (const field of fields) {
    typeOfIsNotString.push(typeof body[field] !== 'string' && true)
  }

  return typeOfIsNotString.every(notIsString => Boolean(notIsString))
}
