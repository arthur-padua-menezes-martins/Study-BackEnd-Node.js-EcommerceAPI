import { Request, Response } from 'express'
import {
  IController,
  IHttpRequest,
  IHttpResponse
} from './express-adapter-protocols'

export const expressRouteAdapter = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body ?? {},
      params: req.params ?? {},
      query: req.query ?? {}
    }

    const httpResponse: IHttpResponse = await controller.handle(httpRequest)
    const response = Object.assign({}, httpResponse)

    if (response.statusCode <= 200 || response.statusCode <= 299) {
      res.status(response.statusCode).json(httpResponse)
    } else {
      res.status(response.statusCode).json({
        ...response,
        errorMessage: response.errorMessage?.message,
        invalidFields: response.invalidFields
      })
    }
  }
}
