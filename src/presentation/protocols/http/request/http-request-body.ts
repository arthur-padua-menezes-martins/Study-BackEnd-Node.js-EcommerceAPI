export interface IHttpRequestBody {
  [field: string]: string | boolean | object | any
  user: {
    informations: {
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
    question: string
    answers: [{
      image: string
      answer: string
    }]
  }
}
