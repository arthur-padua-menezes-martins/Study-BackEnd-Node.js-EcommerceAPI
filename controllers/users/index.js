

/*BASIC MODULES*/
const express = require('express')
const app = express()

/*CRYPTOGRAPHY MODULES*/
const crypto = require('crypto')

/*DATABASE MODULES*/
const mysqlConnection = require('../../models/database/define/connect.js')[0]

/*HELPERS MODULES*/
helpers = require('../../helpers/function.js')

//TODO
// reconfigurar a rota delete para quando o cliente desejar remover sua conta remova somente seu login e senha de usuário mantento os demais dados de pedidos


app.locals.sql =
{
    loginUsers : `SELECT * FROM users WHERE email = ?`,
    loginAdministrators : `SELECT * FROM administrators WHERE email = ?`,

    registerSelect : `SELECT email FROM users WHERE email = ?`,
    registerInsert : `INSERT INTO users ( name, email, password, salt, createdAt, updatedAt ) VALUES ( ?, ?, ?, ?, NOW(), NOW() )`,


    recoverSelect : `SELECT email FROM users WHERE email = ?`,
    recoverUpdate : `UPDATE users SET recovery = ? WHERE email = ?`,
    
    newPasswordSelect : `SELECT password, salt, recovery FROM users WHERE email = ? AND recovery = ?`,
    newPasswordUpdate : `UPDATE users SET password = ?, recovery = null WHERE email = ? AND recovery = ?`,


    accountUpdateSelect : `SELECT * FROM users WHERE email = ?`,

    accountDeleteDelete : ` DELETE FROM users WHERE email = ?`,

    accountCommentsCreate : `INSERT INTO user ( userId, productId, stars, comment ) VALUES ( ?, ?, ?, ?)`
}

app.locals.message =
{
    loginErrorMessage : `informações de autenticação inválidas`,

    registerErrorMessage : `não é possivel gerar uma autenticação válida com os dados fornecidos, por favor tente novamente com outras informações`,


    recoverErrorMessage : `e-mail de recuperação de senha não cadastrado`, 
    recoverWarningMessage : `você poderá redefinir sua senha em até 48 horas`,

    newPasswordErrorMessage_01 : `o período para redefinição de senha expirou, requisite um novo`,
    newPasswordErrorMessage_02 : `informações inválidas, verifique a validade do e-mail`,
    newPasswordSuccessMessage : `senha alterada com sucesso`,
    

    commentsErrorMessage : `requisição inválida, preencha o campo corretamente`,
    commentsSuccessMessage_01 : `comentário atualizado`,
    commentsSuccessMessage_02 : `comentário deletado`
}


class usersController 
{
    
    
/*AUTHENTICATION*/
/**********************************************************************************************************************************/

async login( request, response, next )
{ try {
    
    const { email, password } = request.body

    if( email  &&  password )
        { return await validate( app.locals.sql.loginUsers, email, password, false ) }
    else    
        { errors( response ) } 
        
    function validate ( sql, email, password, Continue )
    {
        mysqlConnection.query( sql, email, ( error, objectUser, fields ) =>
        { 
            if( !error  &&  objectUser[0] != undefined )
            {
                let user = objectUser[0]

                if( user.email == email  &&  user.password == helpers.crypto( password, user.salt ) )
                { 
                    request.user = user
                    return next() 
                }
            } 
    
            if( Continue ) 
                { errors( response ) } 
            else 
                { validate( app.locals.sql.loginAdministrators, email, password, true ) }

        } ) 
    } 

    function errors( response ) { response.send( { errors : app.locals.message.loginErrorMessage } ) }

} catch (error) {}  }  




async register( request, response, next )
{ try {

    const
        { name, email, password } = request.body,   
        salt = crypto.randomBytes(16).toString('hex'),
        required = [ `${name}`, `${email}`, `${helpers.crypto( password, salt )}`, `${salt}` ]

    if( Boolean( required ) )
    {
        mysqlConnection.query( app.locals.sql.registerSelect, email, ( error, user, fields ) =>
        {
            if ( user == '' )
            {   
                mysqlConnection.query( app.locals.sql.registerInsert, required, ( error, user, fields ) =>
                { 
                    mysqlConnection.end()
                    response.send( { success : app.locals.successMessage[0] } )
                } )
            }
            else
                { errors( response ) }
        } )
    }
    else
        { errors( response ) }

    function errors( response ) { response.send( { errors : app.locals.message.registerErrorMessage } ) }

} catch (error) {}  }  




/*PASSWORD RECOVERY*/
/**********************************************************************************************************************************/

async recover( request, response, next )
{ try {

    const
        { email } = request.body,
        recovery = new Date().getTime() + 1000 * 60 * 60 * 24 * 2,
        required = [ recovery, `${email}` ]

    mysqlConnection.query( app.locals.sql.recoverSelect, email, ( error, ObjectUser, fields ) =>
    {
        let user = ObjectUser[0]
   
        if( user != undefined)
        {
            mysqlConnection.query( app.locals.sql.recoverUpdate, required, ( error, update, fields) =>
                { response.send( { warning : app.locals.message.recoverWarningMessage, recovery : recovery } ) } )
        }
        else if ( user == undefined )
            { response.send( { errors : app.locals.message.recoverErrorMessage } ) }
    } )

} catch (error) {}  } 




async newPassword( request, response, next )
{ try {

    const 
        { recovery, email, password } = request.body,
        required = [ `${email}`, recovery ]

    mysqlConnection.query( app.locals.sql.newPasswordSelect, required, ( error, ObjectUser, fields ) =>
    {
        let user = ObjectUser[0]
        
        if( user != undefined )
        {
            if( parseInt( user.recovery ) > new Date().getTime() )
            {
                mysqlConnection.query( app.locals.sql.newPasswordUpdate, [ `${helpers.crypto( password, user.salt )}`, ...required ], ( error, update, fields ) =>
                    { response.send( { success : app.locals.message.newPasswordSuccessMessage } ) } )
            }
            else
                { response.send( { errors : app.locals.message.newPasswordErrorMessage_01 } ) }
        }
        else
            { response.send( { errors : app.locals.message.newPasswordErrorMessage_02 } ) }
    } )

} catch (error) {}  } 




/*ACCOUNT*/
/**********************************************************************************************************************************/

async update( request, response, next )
{ try {
    
    const 
        { body } = request,
        { user } = request.session,
        { email, salt } = user
    let
        sql = `UPDATE users SET `,
        required = String()

    for( const key in body ) 
    { 
        if( key == 'password' ) 
        {
            sql += `${key}=?,`
            required += `${helpers.crypto( body[key], salt )},`
        }
        if( key != 'password' ) 
        {
            sql += `${key}=?,`
            required += `${body[key]},`
        }   
    }
        
    sql += `updatedAt=NOW() WHERE email=?`
    required = ( required + email ).split(',')

    await mysqlConnection.query( sql, required, ( error, updates, fields) => 
    { 
        mysqlConnection.query( app.locals.sql.accountUpdateSelect, `${body.email}`, ( error, updated, fields ) =>
        {
            request.updated = updated[0]
            next ()
        } )
    } )

} catch( error ) {} } 




async delete( request, response, next )
{ try {

    const 
        { user } = request.session.user,
        { email } = user        

    mysqlConnection.query( accountDeleteDelete, email, ( error, deleted, fields ) =>
    {
        user.destroy( error =>
            { response.redirect( `/login` ) })
    } )

} catch( error ) {} } 




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
                allComments  ?  response.render( `account/comments`, { errors:null, warning:null, success:null, allComments } )  :  response.render('account/comments', { errors:commentsErrorMessage, warning:null, success:null, allComments:null } ) 
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

} catch (error) {} }


}
 



/*GLOBAL*/
/**********************************************************************************************************************************/
app.locals.errorMessage = new Array
( 
    //LOGIN
    `dados de autenticação inválidos`,
    //REGISTER
    `não é possivel gerar uma autenticação válida com os dados fornecidos, por favor tente novamente com outras informações`,
    `não é possivel gerar uma autenticação válida com os dados fornecidos, por favor preencha todos os campos`, 
    //RECOVERY
    `e-mail de recuperação de senha não cadastrado`, 
    `o período para redefinição de senha expirou, requisite um novo`,
    `seu período para redefinição de senha expirou, requisite um novo`,
    `os dados informados não pertencem a nenhuma autenticação válida`, 
    //COMMENTS
    `preencha todos os campos`,
    `requisição inválida, preencha o campo corretamente`
)

app.locals.warningMessage = new Array
(
    //RECOVERY
    `você poderá redefinir sua senha em até 48 horas`
)

app.locals.successMessage = new Array
(
    //REGISTER
    `cadastro realizado com sucesso`,
    //RECOVERY
    `senha alterada com sucesso, realize o login novamente`,
    //DELETE
    `usuário deletado com sucesso`,
    //COMMENTS
    `comentário atualizado com sucesso`,
    `comentário deletado com sucesso`
)


app.locals.error = new Array
(
    ( response ) => { response.send( { errors : response.send( { errors : app.locals.errorMessage[4] } ) } ) },



    ( response ) => { response.render( `register`, { errors : app.locals.errorMessage[1], success : null } ) },
    ( response ) => { response.render( `register`, { errors : app.locals.errorMessage[2], success : null } ) },
    ( response ) => { response.render( `recovery`, { errors : app.locals.errorMessage[3] } ) },
    ( response ) => { response.render( `recovery`, { errors : app.locals.errorMessage[4], success : null } ) },
    ( response ) => { response.render( `recovery`, { errors : app.locals.errorMessage[5], success : null } ) },
    ( response ) => { response.render( `recovery/store`, { errors : app.locals.errorMessage[6], warning : null, success : null } ) },
    ( response ) => { response.render( `recovery/store`, { errors : app.locals.errorMessage[5], warning : null, success : null } ) },
    ( response ) => { response.render( `account/comments`, { errors : app.locals.errorMessage[8], warning : null, success : null, COMMENTS : null } ) },
    ( response ) => { response.render( `account/comments`, { errors : app.locals.errorMessage[8], warning : null, success : null, COMMENTS : null } ) },
)

app.locals.warning = new Array
(
    ( response ) => { response.render( `recovery/store`, { errors : null, warning : app.locals.warningMessage[0], success : null } ) },
)

app.locals.success = new Array
(
    ( response ) => { response.render( `register`, { errors : null, warning : null, success : app.locals.successMessage[0] } ) },
    ( response ) => { response.render( `login`, { errors : null, warning : null, success: app.locals.successMessage[1], token : null } ) },
    ( response ) => { response.render( `login`, { errors : null, warning : null, success : app.locals.successMessage[2], token : null } ) },
    ( response, COMMENTS ) => { response.render( `account/comments`, { errors : null, warning : null, success : null, token : null, COMMENTS } ) },
    ( response, COMMENTS ) => { response.render( `account/comments`, { errors : null, warning : null, success : app.locals.successMessage[3], token : null, COMMENTS } ) },
    ( response, COMMENTS ) => { response.render( `account/comments`, { errors : null, warning : null, success : app.locals.successMessage[4], token : null, COMMENTS } ) }
)




/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = usersController