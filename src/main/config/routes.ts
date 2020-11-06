import { Express, Router } from 'express'
import authenticationLoginRoutes from '../routes/authentication/sign-up-and-sign-in'

export default (app: Express): void => {
  const router = Router()
  authenticationLoginRoutes(router)
  app.use('/api', router)
}
