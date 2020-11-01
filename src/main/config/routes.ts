import { Express, Router } from 'express'
import authenticationLoginRoutes from '../routes/authentication/login'

export default (app: Express): void => {
  const router = Router()
  authenticationLoginRoutes(router)
  app.use('/api', router)
}
