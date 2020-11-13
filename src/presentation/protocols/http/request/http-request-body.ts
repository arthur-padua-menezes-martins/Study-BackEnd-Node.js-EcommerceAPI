export interface IHttpRequestBody {
  [field: string]: string | boolean | object | any
  user: {
    [field: string]: object
    informations: {
      [field: string]: object
      personal: {
        [field: string]: string
        name: string
        email: string
        password: string
        passwordConfirmation: string
        cpf: string
      }
      address: {
        [field: string]: string
        cep: string
        street: string
        number: string
        neighborhood: string
        city: string
        state: string
      }
    }
  }
  survey: {
    [field: string]: string | object[]
    question: string
    answers: [{
      [field: string]: string
      image: string
      answer: string
    }]
  }
}
