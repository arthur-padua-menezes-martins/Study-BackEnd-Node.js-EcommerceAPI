import { Express } from 'express'
import { corsAccessControl, bodyParser, defaultContentType } from '../middlewares/export-all'
import cors from '../middlewares/cors/cors-middleware'

export default (app: Express): void => {
  app.use(corsAccessControl)
  app.use(cors)
  app.use(bodyParser)
  app.use(defaultContentType)
}
