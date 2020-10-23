import app from './config/app'
import port from './config/port'

app.listen(port, () => {
  console.log(`server available at localhost:${port}`)
})
