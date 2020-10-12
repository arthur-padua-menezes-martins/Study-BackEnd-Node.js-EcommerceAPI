const

/*DATABASE MODULES*/ 
    mongoose = require(`mongoose`),
    users = require(`../../models/database/MongoDB/Schema/users.js`),

/*HELPERS MODULES*/
    setErrorStatus = require(`../../helpers/error/setErrorStatus.js`)


class sessionsController
{


async check ( request, response, next )
{
    const { session, baseUrl } = request, { user } = session, error = new Error() 

    if( Boolean( user ) )
    {
        users.findById( user._id ).then( async ( User ) =>
        {
            if( Boolean( User ) )
            {
                if( baseUrl == `/adm` )
                {
                    return await validation( User )  ?  next()  :  setErrorStatus.error400( error, next )
                }
                else
                {
                    next() 
                }
            }
            else
            {
                setErrorStatus.error400( error, next )
            }
        })
    }
    else
    {
        setErrorStatus.error400( error, next )
    }

    function validation( User ) { return User.hierarchy == 1  ?  true  :  false }
}




async logout( request, response, next )
{
    const { session } = request

    session.destroy( error => { response.redirect( `/login` ) } )
}


}
module.exports = sessionsController