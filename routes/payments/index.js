/*BASIC MODULES*/
const 
    router = require(`express`).Router(),

/*AUTHENTICATION MODULES*/
    paymentsController = require(`../../controllers/payments/index.js`), payments = new paymentsController()


router.get( `/token`, ( request, response, next ) => { response.render( `pagseguro/index.ejs` ) } )
router.get( `/session`, payments.showSessionId )
router.post( `/notifications`, payments.showNotifications )


router.get( `/:_id`, payments.view ) 
router.post( `/pay/:_id`, payments.pay ) 




/*EXPORTS*/
module.exports = router