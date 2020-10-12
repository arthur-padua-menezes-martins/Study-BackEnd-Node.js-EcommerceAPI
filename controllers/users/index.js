/*DATABASE MODULES*/
const users = require(`../../models/database/MongoDB/Schema/users.js`),

    /*HELPERS MODULES*/
    userMessages = require(`../../helpers/message/userMessages.js`),
    constructors = require(`../../helpers/function/constructors.js`),
    verify = require(`../../helpers/function/verify.js`),

    /*VALIDATIONS MODULES*/
    validationsAccount = require(`../validations/account/account.js`),

    /*FEATURES MODULES*/
    recoverySendingEmail = require(`../../controllers/sendingEmail/recovery.js`)


class usersController {

    async verifySession(request, response, next) {
        try {

            const { params, headers, sessionStore } = request
            let aux, accountInformations = {}, sessionID = headers.cookie.slice((headers.cookie).search('@sessionID=') + 11, (headers.cookie).indexOf(';'))

            aux = JSON.parse(sessionStore.sessions[sessionID]).user
            accountInformations['name'] = aux['name']
            accountInformations['email'] = aux['email']
            accountInformations['phone'] = aux['phone']
            accountInformations['address'] = aux['address']
            accountInformations['_id'] = aux['_id']


            if (typeof aux === 'undefined') {
                response.send({ authenticated: false })
            } else if (params.getInfo === 'true') {
                response.send({ authenticated: true, accountInformations, user_id: accountInformations['_id'] })
            } else {
                response.send({ authenticated: true, user_id: accountInformations['_id'] })
            }

        } catch (error) { response.send({ authenticated: false }) }
    }

    async register(request, response, next) {
        try {

            const { body } = request, { name, email, password } = body

            if (await validationsAccount.all(body)) {
                users.findOne({ email }).then(async User => {
                    if (Boolean(User)) {
                        var user = await new users(await constructors.objectConstructor({ ...body }, [`password`]))

                        await user.passwordHash(password, user)

                        response.send({ success: userMessages.RegisterSuccess })
                    }
                    else {
                        response.send({ errors: userMessages.RegisterError })
                    }
                })
            }
            else {
                response.send({ errors: userMessages.RegisterError })
            }

        } catch (error) { console.error(error) }
    }




    async login(request, response, next) {
        console.log(request)
        try {

            const { email, password } = request.body

            if (verify.every([email, password])) {

                users.findOne({ email }).then(async User => {

                    if (Boolean(User)) {
                        if (await User.verify(password, User)) {
                            request.user = User
                            User.sessionStore(request, response)
                        }
                        else {
                            response.send({ errors: userMessages.LoginError })
                        }
                    }
                    else {
                        response.send({ errors: userMessages.LoginError })
                    }

                })

            }
            else {
                response.send({ errors: userMessages.LoginError })
            }

        } catch (error) { console.error(error) }
    }




    async recovery(request, response, next) {
        try {

            const { email } = request.body, recovery = new Date().getTime() + 1000 * 60 * 60 * 24 * 2

            if (await validationsAccount.all(email)) {
                users.findOne({ email }).then(async User => {
                    if (Boolean(User)) {
                        await User.recover(User, recovery)

                        await recoverySendingEmail(User, recovery, (error = null, success = null) => {
                            if (success) {
                                response.send({ warning: userMessages.RecoveryWarning, recovery })
                            }
                            else {
                                response.send({ errors: userMessages.RecoveryError[0] })
                            }
                        })
                    }
                    else {
                        response.send({ errors: userMessages.RecoveryError[0] })
                    }
                })
            }
            else {
                response.send({ errors: userMessages.EmailValidatorError })
            }

        } catch (error) { console.error(error) }
    }




    async newPassword(request, response, next) {
        try {

            const { recovery, email, password } = request.body

            users.findOne({ email, recovery }).then(async (User) => {
                if (Boolean(User)) {
                    if (parseInt(User.recovery) > new Date().getTime()) {
                        await User.unsetRecover(User, password)
                        response.send({ success: userMessages.RecoverySuccess })
                    }
                    else {
                        response.send({ erros: userMessages.RecoveryError[2] })
                    }
                }
                else {
                    response.send({ erros: userMessages.RecoveryError[1] })
                }
            })

        } catch (error) { console.error(error) }
    }




    /*COMMENTS*/
    /*
    async comments( request, response, next )
    { try {
    
        const 
        { body, comments } = request,
        { method, ref } = body,
        { user } = request.session
            
    
        if( comments )
        {
            const { userId, productId, stars, comment } = comments
    
            if( Boolean( userId, productId, stars, comment ) )
            {
                mysqlConnection.query( accountCommentsCreate, required, ( error, coments, fields ) =>
                {
                    response.send( { success : commentsSuccessMessage_01 } )
                } )
            }
    
    
            await mysqlConnection.query( accountCommentsSelectAll, required, ( error, allComments, fields ) =>
            {
    
                if( !Boolean( ref ) )
                {
                    allComments  ?  response.render( `account/comments`, { errors:null, warning:null, success:null, allComments } )  :  response.render(`account/comments`, { errors:commentsErrorMessage, warning:null, success:null, allComments:null } ) 
                }
    
    
                if( request.method == `POST` )
                {   
                    if( method == `update` )
                    {
                        var
                            update = new Object(),
                            keys = new Array()
    
                        for( const key in body ) { Boolean(body[key])  ?  update[key] = body[key]  :  keys.push(key) }
    
                        mysqlConnection.query( accountCommentsUpdate, required, ( error, updated, fields ) =>
                        {
                            if( Boolean( updated ) )
                                { response.send( { update : commentsSuccessMessage_01 } ) }
                            else
                                { response.send( { errors : commentsErrorMessage } ) }
                        } )
                    }
    
                    
                    if( method == `delete` )
                    {
                        mysqlConnection.query( accountCommentsDelete, required, ( error, updated, fields ) =>
                        {
                            if( Boolean( updated ) )
                                { response.send( { update : commentsSuccessMessage_02 } ) }
                            else
                                { response.send( { errors : commentsErrorMessage } ) }
                        } )
                    }
                }
    
            } )
        }
    
    } catch ( error ) { console.error( error ) } }  
    */

}
module.exports = usersController