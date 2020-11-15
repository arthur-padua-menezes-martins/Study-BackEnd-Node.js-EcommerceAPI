import { Request, Response, NextFunction } from 'express'
import {
  IMiddleware,
  IHttpRequestHeaders,
  IHttpResponse
} from './express-adapter-protocols'

export const expressMiddlewareAdapter = (middleware: IMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: IHttpRequestHeaders = {
      headers: req.headers
    }

    const httpResponse: IHttpResponse = await middleware.handle(httpRequest)
    const response = Object.assign({}, httpResponse)

    if (response.statusCode === 200) {
      Object.assign(req, httpResponse.body)

      next()
    } else {
      res.status(response.statusCode).json({
        ...response,
        errorMessage: response.errorMessage?.message
      })
    }
  }
}
