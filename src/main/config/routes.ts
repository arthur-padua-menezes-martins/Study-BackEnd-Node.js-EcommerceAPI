import { Express, Router } from 'express'
import authenticationLoginRoutes from '../routes/authentication/authentication-routes'
import administratorSurveyRoutes from '../routes/administrator/survey/survey-routes'

export default (app: Express): void => {
  const router = Router()

  authenticationLoginRoutes(router)
  administratorSurveyRoutes(router)

  app.use('/api', router)
}
