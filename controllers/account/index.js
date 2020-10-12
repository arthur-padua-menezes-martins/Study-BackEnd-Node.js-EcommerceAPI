 /*DATABASE MODULES*/
 const users = require(`../../models/database/MongoDB/Schema/users.js`)


class accountController
{

    async show( request, response, next )
    { try {
    
        const { _id } = request.session.user
        
        users.findById( _id ).then( ( User ) =>
        {
            response.render( `account/index.ejs`, { User } ) 
        })
        
    } catch ( error ) { console.error( error ) } }  
    
    
    
    
    async update( request, response, next )
    { try {
    
        if( request.method == `GET` )
        {
            response.render( `account/update` )
        }
    
        const { body, session } = request, { user } = session, { _id } = user
        let update = {}, keys = []
    
        users.findById( _id ).then( async ( User ) =>
        {
            for( const Key in body ) { Boolean( body[Key] )  ?  update[Key] = body[Key]  :  keys.push(Key) }
            for( const key in update ) { key == `password`  ?  User[key] = await User.passwordHash( update[key], User )  :  User[key] = body[key] }
            User.save()
            User.sessionUpdate( request, response, User )
        })
    
    } catch ( error ) { console.error( error ) } }  
    
    
    
    
    async delete( request, response, next )
    { try {
    
        const { session } = request, { user } = session, { _id } = session
    
        users.findById( _id ).then( async ( User ) =>
        {
            await User.accountDelete( User )
            User.sessionLogout( request, response )
        } )    
    
    } catch ( error ) { console.error( error ) } }  

} 
module.exports = accountController