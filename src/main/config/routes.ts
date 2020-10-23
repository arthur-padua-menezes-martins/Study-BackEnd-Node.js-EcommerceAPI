import { Express, Router } from 'express'
import signUpRoutes from '../routes/sign-up'

export default (app: Express): void => {
  const router = Router()
  signUpRoutes(router)
  app.use('/api', router)
}
