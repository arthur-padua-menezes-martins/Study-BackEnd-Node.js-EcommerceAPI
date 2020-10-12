/*BASIC MODULES*/
const
    router = require(`express`).Router(),

/*FILES MODULES*/
    multer = require(`multer`),
    multerConfig = require(`../../helpers/multer/multerConfig.js`),
    upload = multer( multerConfig ),

/*AUTHENTICATION MODULES*/ 
    admController = require(`../../controllers/adm/index.js`),
    adm = new admController()





const { resolve } = require('path')
const up = multer({
    dest : resolve( __dirname, '..', '..', 'uploads' )
})



/*SEARCH*/
router.get( `/search`, adm.search )

router.get( `/search/users/:_id?`, adm.searchUsers ) 

router.get( `/search/assessments/:_id?`, adm.searchAssessments )
 


/*CONTROL*/
router.get( `/control`, adm.control )

router.get( `/control/users/:_id?`, adm.controlUsers )
router.post( `/control/users/:_id?`, adm.controlUsers )

router.post( `/control/assessments`, adm.controlAssessments )

router.post( `/control/email`, adm.controlEmail )

router.get( `/control/categories/:_id?`, adm.controlCategories )
router.post( `/control/categories/:_id?`, adm.controlCategories )

router.get( `/control/products/:_id?`, adm.controlProducts )
router.post( `/control/products/:_id?`, upload.array(`file`), adm.controlProducts )

router.post( `/control/variations/:_id?`, upload.array(`file`,6), adm.controlVariations )//upload.array(`file`)

router.get( `/control/requests/:_id?`, adm.controlRequests )
router.post( `/control/requests/:_id?`, adm.controlRequests )

router.post( `/control/deliveries/:_id?`, adm.controlDeliveries )

router.post( `/control/payments/:_id?`, adm.controlPayments ) 


/*EXPORTS*/
module.exports = router

