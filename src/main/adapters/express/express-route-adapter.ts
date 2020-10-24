import { Request, Response } from 'express'
import { IHttpRequest, IHttpResponse, Controller } from '../../../presentation/protocols/export-all'

export const expressRouteAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body
    }

    const httpResponse: IHttpResponse = await controller.handle(httpRequest)
    const httpResponseAssign = Object.assign({}, {
      json: {
        statusCode: httpResponse.statusCode,
        body: httpResponse.body,
        successMessage: httpResponse.successMessage,
        errorMessage: httpResponse.errorMessage
      }
    })

    if (httpResponseAssign.json.statusCode === 200) {
      res.status(httpResponseAssign.json.statusCode).json(httpResponseAssign.json)
    } else {
      res.status(httpResponseAssign.json.statusCode).json({
        ...httpResponseAssign.json,
        errorMessage: httpResponseAssign.json.errorMessage?.message
      })
    }
  }
}
