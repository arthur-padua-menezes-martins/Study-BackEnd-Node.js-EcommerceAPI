`use strict`

/*BASIC MODULES*/
const
  express = require(`express`),
  app = express(),

  /*FEATURES MODULES*/
  bodyParser = require(`body-parser`),
  ejs = require(`ejs`),
  compression = require(`compression`),
  morgan = require(`morgan`),

  /*DATABASE MODULES*/
  mongoose = require(`mongoose`),
  MongoDB = require(`./models/database/MongoDB/connect.json`).database,

  /*AUTHENTICATION MODULES*/
  secret = require(`./config/index.js`).secret,
  session = require(`express-session`),
  cors = require(`cors`),
  sessionController = require(`./controllers/session/index.js`), Session = new sessionController(),
  errorController = require(`./controllers/error/index.js`), Error = new errorController()




/*USED BY THE APPLICATION*/
/**********************************************************************************************************************************/

/*DATABASE*/
mongoose.connect(MongoDB, { useNewUrlParser: true })


/*BODY PARSER*/
app.use(bodyParser.urlencoded({ extended: false, limit: 1.5 * 1024 * 1024 }))
app.use(bodyParser.json({ limit: 1.5 * 1024 * 1024 }))


/*TEMPLATE ENGINE*/
app.set(`view engine`, `ejs`)


/*SESSION*/
app.use(session({
  secret: secret, resave: false, saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: `lax` }
}))


/*AUTHENTICATION*/
app.use(cors({
  credentials: true,
  exposedHeaders: [`set-cookie`],
  origin: [`http://localhost:9998`, `http://localhost:9999`, `http://localhost:10000`]
}))


/*OTHERS*/
app.use(compression())
app.disable(`x-powered-by`)
app.use(express.static(`public`))


/*ROUTES*/
app.use(`/favicon.ico`, (request, response, next) => next())
app.use(require(`./routes/users/index.js`))
app.use(`/search`, require(`./routes/search/index.js`))
app.use(`/account`, require(`./routes/account/index.js`))//Session.check,
app.use(`/payments`, require(`./routes/payments/index.js`))//Session.check,
app.use(`/adm`, Session.check, require(`./routes/adm/index.js`))//Session.check,
app.use((error, request, response, next) => { Error.errorHandling(error, request, response, next) })


/*SERVER*/
app.listen(9999, error => { error ? console.error(error) : console.log(`server available at localhost:9999`) })
