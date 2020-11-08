import { Request, Response } from 'express'
import { IHttpRequest, IHttpResponse, IController } from '../../../presentation/protocols/export-all'

export const expressRouteAdapter = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      params: req.params || {},
      query: req.query || {},
      body: req.body || {}
    }

    const httpResponse: IHttpResponse = await controller.handle(httpRequest)
    const response = Object.assign({}, httpResponse)

    if (response.statusCode === 200) {
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
