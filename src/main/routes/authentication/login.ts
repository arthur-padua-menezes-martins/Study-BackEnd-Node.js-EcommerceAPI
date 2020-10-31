import { Router } from 'express'
import { expressRouteAdapter } from '../../adapters/express/express-route-adapter'
import { makeSignUpController } from '../../factories/authentication/sign-up-controller-factory'
import { makeSignInController } from '../../factories/authentication/sign-in-controller-factory'

export default (router: Router): void => {
  router.post('/signup', expressRouteAdapter(makeSignUpController()))
  router.post('/signin', expressRouteAdapter(makeSignInController()))
}
