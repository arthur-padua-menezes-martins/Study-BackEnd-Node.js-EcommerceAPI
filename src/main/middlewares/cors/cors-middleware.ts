import { Request, Response, NextFunction } from 'express'
import cors from 'cors'

export const corsAccessControl = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-methods', '*')
  res.set('access-control-allow-headers', '*')
  next()
}

export default cors({
  credentials: true
})
