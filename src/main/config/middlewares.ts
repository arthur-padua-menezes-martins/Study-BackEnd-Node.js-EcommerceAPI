import { Express } from 'express'
import { bodyParser } from './middlewares/body-parser'
import cors, { corsAccessControl } from './middlewares/cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(corsAccessControl)
  app.use(cors)
}
