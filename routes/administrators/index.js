

/*BASIC MODULES*/
const router = require('express').Router()

/*FILES MODULES*/
const multer = require('multer')
const multerConfig = require('../../helpers/multerConfig.js')
const upload = multer( multerConfig ) 

/*AUTHENTICATION MODULES*/
const administratorsController = require('../../controllers/administrators/index.js'); const administratorController = new administratorsController()
const usersController = require('../../controllers/users/index.js'); const userController = new usersController()
const sessionsController = require('../../controllers/session/index.js'); const sessionController = new sessionsController()




/*SEARCH*/
/**********************************************************************************************************************************/
router.get( 'search', administratorController.search ) // gráficos com quantidades de usuários online, novos usuários, usuários que cancelaram suas contas ...
router.get( '/search/users', administratorController.searchUsers ) // todos os clientes que ...
router.get( '/search/users/:id', administratorController.searchUsers ) // um determinado cliente que ...


router.get( '/control', administratorController.control ) // gráficos com novos comentários, quantidade de e-mails enviados ...

router.get( '/control/products', administratorController.controlProducts ) //
router.post( '/control/products', upload.array('file'), administratorController.controlProducts )

router.get( '/control/comments', administratorController.controlComments ) //
router.post( '/control/comments', administratorController.controlComments ) //

router.get( '/control/email', administratorController.controlEmail ) //


/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = router

