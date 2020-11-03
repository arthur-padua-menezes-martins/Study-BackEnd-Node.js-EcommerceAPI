import { Router } from 'express'
import { expressRouteAdapter } from '../../adapters/express/express-route-adapter'
import { makeSignUpController } from '../../factories/account/sign-up-controller-factory'
import { makeSignInController } from '../../factories/account/sign-in-controller-factory'

export default (router: Router): void => {
  router
    .post('/sign-up', expressRouteAdapter(
      makeSignUpController()
    )).get('/sign-up', expressRouteAdapter(
      makeSignUpController()
    ))

  router.post('/sign-in', expressRouteAdapter(
    makeSignInController()
  ))
}
