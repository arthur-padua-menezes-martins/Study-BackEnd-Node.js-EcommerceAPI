export abstract class SuperClassRequiredFieldsValidator {
  static verifyIfTheFieldsLengthIsGreaterThatZero (fields: any) {
    return fields.length > 0
  }

  static verifyIfTheBodyLengthIsGreaterThanZero (body: any) {
    return Object.keys(body).length > 0
  }

  static verifyIfTheBodyIsAnObject (body: any) {
    return typeof body === 'object'
  }
}
