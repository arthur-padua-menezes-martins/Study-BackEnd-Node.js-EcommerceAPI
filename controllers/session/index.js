

/*BASIC MODULES*/
const express = require('express')
const app = express()

/*AUTHENTICATION MODULES*/
const expressSession = require('express-session')




app.locals.message =
{
    updateSuccessMessage : `informações atualizadas`
}


class sessionsController
{


async check ( request, response, next )
{
    const { user } = request.session
    const { baseUrl } = request

    if( baseUrl == '/administrator'  &&  user )
        { return validation()  ?  next()  :  app.locals.error[0]( response ) }
    if( baseUrl != '/administrator'  &&  user )
        next()
    else
        app.locals.error[0]( response )

    function validation() { return  user.hierarchy == 1  ?  true  :  false }
}




async store( request, response, next )
{
    const { session, user } = request

    session.user = user
    response.send( { success : app.locals.successMessage[0] } )
}




async update ( request, response, next )
{
    var 
        { updated } = request,
        { user } = request.session

    for( const key in updated ) { user[key] = updated[key] }
    response.send( { success : app.locals.message.updateSuccessMessage } )
}




async logout( request, response, next )
{
    const { session } = request

    session.destroy( error => 
        { response.redirect('/login') } ) 
}


}




/*GLOBAL*/
app.locals.errorMessage = new Array
(
    `falha na autenticação`,
    `falha na atualização`,
    `falha ao finalizar a sessão, tente novamente`
)

app.locals.warningMessage = new Array
(
    
)

app.locals.successMessage = new Array
(
    `login realizado com sucesso`,
    `atualização bem sucedida`,
    `sessão finalizada`
)


app.locals.error = new Array
(
    ( response ) => { response.render( `login`, { errors : app.locals.errorMessage[0], success : null, token : null } ) },
    ( response ) => { response.render( `account/update`, { errors : app.locals.errorMessage[1], success : null, token : null } ) },
    ( response ) => { response.render( `login`, { errors : errorMessage[2], success: null, token : null } ) }
)

app.locals.success = new Array
(
    ( response ) => { response.render( `login`, { errors : null, success : app.locals.successMessage[0], token : null } ) },
    ( response ) => { response.render( `account/update`, { errors : null, success : app.locals.successMessage[1], token : null } ) },
    ( response ) => { response.render( `login`, { errors : null, success: app.locals.successMessage[2], token : null } ) }
)




/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = sessionsController