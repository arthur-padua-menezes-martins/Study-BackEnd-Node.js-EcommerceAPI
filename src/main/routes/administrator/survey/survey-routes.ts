import { Router } from 'express'
import { expressRouteAdapter } from '../../../adapters/express/express-route-adapter'
import { expressMiddlewareAdapter } from '../../../adapters/express/express-middleware-adapter'
import { makeAddSurveyController } from '../../../factories/administrator/survey/add-survey-controller-factory'
import { makeAuthMiddlewareController } from '../../../factories/middlewares/auth-middleware-controller-factory'

export default (router: Router): void => {
  const middlewareAdministratorAuth = expressMiddlewareAdapter(
    makeAuthMiddlewareController('administrator')
  )

  router.post('/add-survey', middlewareAdministratorAuth, expressRouteAdapter(
    makeAddSurveyController()
  ))
}
