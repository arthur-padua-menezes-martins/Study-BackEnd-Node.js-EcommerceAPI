'use strict';

/*BASIC MODULES*/
/**********************************************************************************************************************************/
const express = require('express')
const app = express()

/*AUTHENTICATION MODULES*/
/**********************************************************************************************************************************/
const session = require('express-session')
const secret = require('./config/index.js').secret
const cors = require('cors')
const sessionsController = require('./controllers/session/index.js'); const sessionController = new sessionsController()
const administratorsController = require('./controllers/administrators/index.js'); const administratorController = new administratorsController()

/*FEATURES MODULES*/
/**********************************************************************************************************************************/
const bodyParser = require('body-parser')
const ejs = require('ejs')
const compression = require('compression')
const morgan = require('morgan')




/*USED BY THE APPLICATION*/
/**********************************************************************************************************************************/

/*BODY PARSER*/
app.use( bodyParser.urlencoded( { extended : false, limit : 1.5*1024*1024 } ) )
app.use( bodyParser.json( { limit : 1.5*1024*1024 } ) )


/*TEMPLATE ENGINE*/
app.set('view engine', 'ejs')


/*SESSION*/
app.use( session( { secret : secret, resave : true, saveUninitialized : true } ) )


/*OTHERS*/
app.use(compression())
app.use(morgan())
app.use(cors())
app.disable('x-powered-by')
app.use( express.static('public') )


/*ROUTES*/
app.use( '/favicon.ico', ( request, response, next ) => { return next() } )
app.use( '/administrator', sessionController.check, require( './routes/administrators/index.js' ) )
app.use( '/account', sessionController.check, require( './routes/account/index.js' ) )
app.use( require( './routes/users/index.js' ) )
app.use( require( './routes/search/index.js' ) )



/*SERVER*/
/**********************************************************************************************************************************/
app.listen(9999, error => { error ? console.warn(error) : console.log( 'localhost:9999' ) })