import {
  IMiddleware
} from './import-all'
import {
  AuthMiddleware
} from '../../../presentation/middlewares/auth/token/auth-middleware'
import {
  readAccount
} from './auth/auth-middleware-controller-search-by-token-factory'

export const makeAuthMiddlewareController = (role?: string): IMiddleware => {
  return new AuthMiddleware(readAccount, role)
}
