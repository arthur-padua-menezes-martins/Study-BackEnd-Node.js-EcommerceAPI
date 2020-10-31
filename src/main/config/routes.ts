import { Express, Router } from 'express'
import loginRoutes from '../routes/authentication/login'

export default (app: Express): void => {
  const router = Router()
  loginRoutes(router)
  app.use('/api', router)
}
