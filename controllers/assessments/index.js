/*CRYPTOGRAPHY MODULES*/
const crypto = require(`crypto`),

/*DATABASE MODULES*/
    products = require(`../../models/database/MongoDB/Schema/products.js`),
    assessments = require(`../../models/database/MongoDB/Schema/assessments.js`),

/*HELPERS MODULES*/
    database = require(`../../helpers/function/database.js`),
    verify = require(`../../helpers/function/verify.js`),
    setErrorStatus = require(`../../helpers/error/setErrorStatus.js`)


class Assessments
{

async view( request, response, next )
{ try {

    const { body, params, session } = request, { user } = session
    let error = new Error()

    if( request.method == `GET` )
    {
        const { _id } = params

        if( Boolean( _id ) )
        {
            await assessments.find( { $and : [ { users : user._id }, { _id } ] } ).then( ( Assessments ) =>
            {
                if( Boolean( Assessments) )
                {
                    response.send( Assessments )
                }
            })
        }
        else
        {
            await assessments.find( { users : user._id } ).then( ( Assessments ) =>
            {
                if( Boolean( Assessments) )
                {
                    response.send( Assessments )
                }
            })
        }
    }
    if( request.method == `POST` )
    {
       
    }
    

    function view ( response, Assessments ) { response.render(`account/assessments/index.ejs`, { Assessments } ) }

} catch( error ) { console.error( error ) } }




async create( request, response, next )
{ try {

    const { body, session } = request, { reference, stars, message } = body, { user } = session
    let error = new Error()

    await products.find( { reference } ).then( async ( Product ) =>
    {
        if( verify.notNull( Product ) )
        {
            let Assessments = await new assessments ( { name : user.name, stars : stars, message : message, users : user._id, products : Product[0]._id } )
            Assessments.save()
            response.send( Assessments )
        }
        else
        {
            setErrorStatus.Error422( error, next )   
        }
    }) 

} catch( error ) { console.error( error ) } }




async update( request, response, next )
{ try {

    const { body, session } = request, { _id, stars, message } = body, { user } = session
    let error = new Error()

    if( verify.allTrue( [ _id, stars, message ] ) )
    {
        await assessments.findOne( { $and : [ { users : user._id }, { _id } ] } ).then( async ( Assessments ) =>
        {
            if( verify.notNull( Assessments ) )
            {
                Assessment = await database.update( Assessments, body, [ `update`, `_id` ] )
                Assessment.save()
                response.send( Assessment )
            }
            else
            {
                setErrorStatus.Error422( error, next )   
            }
        }) 
    }
    else
    {
        setErrorStatus.Error422( error, next ) 
    }
        
} catch( error ) { console.error( error ) } }


}




module.exports = Assessments