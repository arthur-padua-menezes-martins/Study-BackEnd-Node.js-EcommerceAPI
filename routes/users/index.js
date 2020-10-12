const
    router = require(`express`).Router(),
    redisClient = require(`../../server.js`),
    usersController = require(`../../controllers/users/index.js`), users = new usersController()


router.get(`/view`, (request, response) => { response.json({ session: request.session }) })
router.get(`/session/:getInfo?`, users.verifySession)

router.get(`/register`, (request, response) => { response.render(`register/register.ejs`) })
router.post(`/register`, users.register)


router.get(`/login`, (request, response) => { response.render(`login/login.ejs`) })
router.post(`/login`, users.login)


router.get(`/recovery-password`, (request, response) => { response.render(`recovery/recovery-password.ejs`) })
router.post(`/recovery-password`, users.recovery)

router.get(`/new-password`, (request, response) => { response.render(`recovery/new-password.ejs`) })
router.post(`/new-password`, users.newPassword)


/*EXPORTS*/
module.exports = router