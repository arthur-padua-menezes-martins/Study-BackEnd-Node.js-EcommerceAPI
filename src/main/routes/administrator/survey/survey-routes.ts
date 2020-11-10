import { Router } from 'express'
import { expressRouteAdapter } from '../../../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../../../factories/survey/add-survey-controller-factory'

export default (router: Router): void => {
  router.post('/add-survey', expressRouteAdapter(
    makeAddSurveyController()
  ))
}
