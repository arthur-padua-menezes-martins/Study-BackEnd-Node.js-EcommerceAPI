import { mongoHelper } from '../infra/db/mongodb/helper/mongo-helper'
import env from './config/env'

mongoHelper.connect(env.mongoUrl).then(async () => {
  const app = (await import('./config/app')).default

  app.listen(env.port, () => {
    console.log(`server available at localhost:${env.port}`)
  })
}).catch(console.error)
