/*BASIC MODULES*/
const 
    router = require(`express`).Router(),

/*AUTHENTICATION MODULES*/
    sessionController = require(`../../controllers/session/index.js`), session = new sessionController(), 
    accountController = require(`../../controllers/account/index.js`), account = new accountController(),
    assessmentsController = require(`../../controllers/assessments/index.js`), assessments = new assessmentsController(),    
    requestsController = require(`../../controllers/requests/index.js`), requests = new requestsController(), 
    deliveriesController = require(`../../controllers/deliveries/index.js`), deliveries = new deliveriesController()    

    
/*GET*/
router.get( `/`, account.show )

router.get( `/update`,account.update )

router.get( `/delete`, account.delete )

router.get( `/logout`, session.logout )

router.get( `/assessments/:_id?`, assessments.view )

router.get( `/requests/view/:_id?`, requests.view )
router.get( `/requests/cart/:_id?`, requests.viewCart )

router.get( `/deliveries/:_id?`, deliveries.view )




/*POST*/
router.post( `/update`, account.update )

router.post( `/assessments/create`, assessments.create )
router.post( `/assessments/update`, assessments.update )

router.post( `/requests/create`, requests.create )
router.post( `/requests/remove/:_id`, requests.remove )
router.post( `/requests/cart/:_id`, requests.viewCart )

router.post( `/deliveries/calculate`, deliveries.calculate )




/*EXPORTS*/
module.exports = router