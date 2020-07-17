

/*BASIC MODULES*/
const router = require('express').Router()
const validation = require('express-validation')

/*AUTHENTICATION MODULES*/
const searchsController = require('../../controllers/search/index.js'); const searchController = new searchsController()
const usersController = require('../../controllers/users/index.js'); const userController = new usersController()
const sessionsController = require('../../controllers/session/index.js'); const sessionController = new sessionsController()

 


router.get( '/:product', searchController.products, searchController.page404 )
router.post( '/:product', searchController.products )

router.get( '/:product/:category', searchController.products, searchController.page404 )
router.post( '/:product/:category', searchController.products )

router.get( '/:product/:category/:reference', searchController.products, searchController.page404 )
router.post( '/:product/:category/:reference', searchController.products, userController.comments )

  


/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = router