/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-extend-native */
import { IHttpRequestBody } from '../../../presentation/protocols/http'

interface String {
  missingFields: (fields: string[], body: IHttpRequestBody) => string
}

String.prototype.missingFields = function (fields: string[], body: IHttpRequestBody): string {
  var missingFields = this.toString()

  if (typeof body !== 'undefined') {
    for (const field of fields) {
      missingFields += (field in body) ? '' : `${field} `
    }
  } else {
    for (const field of fields) {
      missingFields += `${field} `
    }
  }

  return missingFields
}
