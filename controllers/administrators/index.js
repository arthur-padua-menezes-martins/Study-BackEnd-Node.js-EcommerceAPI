

/*CRYPTOGRAPHY MODULES*/
const crypto = require('crypto')

/*DATABASE MODULES*/
const define = require('../../models/database/define/define.js')




class administratorsController 
{


/*SEARCH*/
/**********************************************************************************************************************************/

/*search*/
search( request, response, next ) { response.render( 'administrator/search/users' ) }




async searchUsers( request, response, next )
{ try {
    
    var 
        { id } = request.params,
        keys = new Array ( 'password', 'salt', 'recovery', 'updatedAt' ),
        search = new Object( { raw : true, where : { id }, attributes : { exclude : keys } } ),
        RESULT = new Object( { id } )

    if ( id )

        define[0].findOne( search ).then( (USERS) => 
        { 
            render( response, USERS, RESULT ) 
        }).catch( error => { response.send( error ) } )

    else

        define[0].findAll( { ...search, where : {} } ).then( (USERS) => 
        { 
            render( response, USERS, RESULT ) 
        }).catch( error => { response.send( error ) } )
    
    function render( response, USERS, RESULT ) { response.render( `administrator/search/users/users.ejs`, { USERS, ...RESULT } )  }

} catch (error) { console.error(error) }}





/*CONTROL*/
/**********************************************************************************************************************************/

control( request, response, next ) { response.render( 'administrator/control' ) }




async controlProducts( request, response, next )
{
    if( request.method == 'POST' )
    {
        const { referenceForUpdate, referenceForView, referenceForCreate, product, category, name, value } = request.body
        var 
            files  =  request.files != undefined  &&  request.files[0] != undefined  ?  request.files  :  new Array( new Object( { null : true } ) ),
            update = new Object(),
            keys = new Array( 'createdAt', 'updatedAt', 'referenceForUpdate' ),
            images = ''
            images = setImages(images)

            if( referenceForUpdate )
            { 
                images  ?  update['images'] = images  :  keys.push('images')

                for( const key in request.body ) { request.body[key] != undefined  ?  update[key] = request.body[key]  :  keys.push(key) }
  
                define[2].update( update, { where : { reference : referenceForUpdate }, attributes : { exclude : keys } }).then( (product) =>  
                    { response.render( 'administrator/control/products' ) } ).catch( ( error ) => { response.json( { error } ) } ) 
            }


            if( referenceForView ) 
            {
                define[2].findOne({ where : { reference : referenceForView } } ).then( (RESULT) =>  
                    { response.send( RESULT ) } ).catch( ( error ) => { response.json( { error } ) } ) 
            }


            if( referenceForCreate )
            {
                const create = 
                { 
                    reference : referenceForCreate, product, category,
                    variations : [ { name, value, images } ] 
                }

                define[2].create(  create, { include : [ { model : define[3], as : 'variations' } ] } ).then( ( product ) => 
                { 
                    response.render( 'administrator/control/products' ) 
                } ).catch( ( error ) => { response.json( { error } ) } ) 
            }

    function setImages(images) { for( let i = 0; i <= files.length - 1; i++ ) { files[i].path  ?  images += `${files[i].path}🖼️` : undefined; if( i == files.length -1 ) { return images } } }

    } 
    else response.render( 'administrator/control/products', { RESULT : null } ) }




controlComments( request, response, next ) { response.render( 'administrator/control/comments' ) }




controlEmail( request, response, next ) { response.render( 'administrator/control/email' ) }


}




/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = administratorsController