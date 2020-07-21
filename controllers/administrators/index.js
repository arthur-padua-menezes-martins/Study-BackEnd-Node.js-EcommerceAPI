

/*BASIC MODULES*/
const express = require('express')
const app = express()

/*CRYPTOGRAPHY MODULES*/
const crypto = require('crypto')

/*DATABASE MODULES*/
const mysqlConnection = require('../../models/database/define/connect.js')[0]

/*HELPERS MODULES*/
helpers = require('../../helpers/function.js')


app.locals.message = 
{
    controlProductsInsertError : `requisição inválida, preencha todos os campos obrigatórios`
}

app.locals.sql =
{
    controlProductsSelect : `SELECT * FROM products WHERE reference = ?`,
    controlVariationsSelect : `SELECT * FROM variations WHERE productId = ?`
}


class administratorsController 
{


/*SEARCH*/
/**********************************************************************************************************************************/

search( request, response, next ) { response.render( 'administrator/search/users' ) }




async searchUsers( request, response, next )
{ try {

    const { id } = request.params

    if( id )
    {
        mysqlConnection.query( administratorsSearchUsersSelect, required, ( error, user, fields ) =>
        { searchUsers( response, user ) } )
    }
    else
    {
        mysqlConnection.query( administratorsSearchUsersSelectAll, required, ( error, users, fields ) =>
            { searchUsers( response, users ) } )
    }

    function searchUsers( response, info )
        { return response.render( `administrator/search/users/users.js`, { info } ) }
/*
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
*/
} catch ( error ) {} }





/*CONTROL*/
/**********************************************************************************************************************************/

control( request, response, next ) { response.render( 'administrator/control' ) }




async controlProducts( request, response, next )
{
    const { method, body } = request
    body.reference = body.insert

    if( method == 'POST' )
    {
        const { select, insert, update, product, category, name, value } = body
        var
            { files } = request,
            files = ( Boolean(files)  &&  Boolean(files[0]) )  ?  files  :  [{}],
            images = String()
            
            body.images = setImages( images )
            
        if( select )
        {
            mysqlConnection.query( app.locals.sql.controlProductsSelect, select, ( error, p, fields ) =>
            {
                mysqlConnection.query( app.locals.sql.controlVariationsSelect, p[0].id, ( errors, v, fields ) =>
                {
                    if( p && v ) 
                        { response.send( [p, v] ) }
                } )
            } )
        }


        if( insert )
        {
            body.insert = ''

            let 
                [ productsSql, productsRequired, productsRequiredValues, variationsSql, variationsRequired, variationsRequiredValues ] = helpers.ControlProductsSqlConstructor( body, true ),
                Psql = `INSERT INTO products ( ${ productsSql } ) VALUES ( ${ productsRequired } )`,
                Vsql = `INSERT INTO variations ( productId,${ variationsSql } ) VALUES ( LAST_INSERT_ID(), ${ variationsRequired } )`

            
            mysqlConnection.query( Psql, productsRequiredValues, ( errors, success, fields ) =>
            {
                if( !errors )
                {
                    mysqlConnection.query( Vsql, variationsRequiredValues, ( error, success, fields ) =>
                    { 

                        response.redirect('/administrator/control/products') 
                    } )
                }
            } )   
        }


        if( update )
        {
            let 
                [ productsSql, productsRequiredValues, variationsSql, variationsRequiredValues ] = helpers.ControlProductsSqlConstructor( body, false, true ),
                pSql = `UPDATE products SET ${ productsSql } WHERE reference = ?`,
                vSql = `UPDATE variations SET ${ variationsSql } WHERE productId = ?`

            mysqlConnection.query( pSql, [ ...productsRequiredValues, update ], ( erro, success, fields ) =>
            { 
                mysqlConnection.query( app.locals.sql.controlProductsSelect, update, ( error, product, fields ) =>
                {
                    mysqlConnection.query( vSql, [ ...variationsRequiredValues, product[0].id ], ( errors, success, fields ) =>
                    { 
                        if( !erro  &&  !error  &&  !errors ) 
                                { response.redirect('/administrator/control/products') } 
                    } )
                 } )
            } )
        }
    }
    else 
        { response.render( `administrator/control/products` ) }

    function setImages( images )
    {
        for( let i = 0; i <= files.length - 1; i++ ) 
        {
            Boolean( files[i] )  ?  images += `${files[i].path}─`  :  undefined
            if( i == files.length - 1) { return images }
        }
    }
/*

    if( request.method == 'POST' )
    {
        const { update, select, insert, product, category, name, value } = request.body
        var 
            files  =  request.files != undefined  &&  request.files[0] != undefined  ?  request.files  :  new Array( new Object( { null : true } ) ),
            updates = new Object(),
            keys = new Array( 'createdAt', 'updatedAt', 'update' ),
            images = ''
            images = setImages(images)

        if( update )
        {
            let [ sql, required ] = helpers.ControlProductsSqlConstructor( request.body ); 

            sql = `UPDATE products SET ${sql.replace( /,$/, '' )} WHERE reference = '${update}'`
            required = ( required.replace( /,$/, '' ) ).split(',')

            mysqlConnection.query( sql, required, ( error, products, fields ) =>
                {  response.send( { success : products } ) } )
        }


        if( select )
        {
            mysqlConnection.query( app.locals.sql.controlProductsSelect, select, ( error, products, fields ) =>
            {
                if( products )
                    { response.send( products[0] ) }
                else
                    { response.send( { errors : error } ) }
            } )
        }


        if( insert )
        {
            request.body.reference = request.body.insert 
            request.body.insert = ''
            
            let 
                [ productsSql, productsRequired, productsRequiredValues, variationsSql, variationsRequired, variationsRequiredValues ] = helpers.ControlProductsSqlConstructor( request.body, true ),
                pSql = `INSERT INTO products ( ${ productsSql.replace( /,$/, '' ) } ) VALUES ( ${ productsRequired.replace( /,$/, '' ) } )`,
                vSql = `INSERT INTO variations ( variations.productId, ${ variationsSql.replace( /,$/, '' ) } ) VALUES ( LAST_INSERT_ID(), ${ variationsRequired.replace( /,$/, '' ) } )`
                
                variationsRequiredValues = ( variationsRequiredValues.replace( /,$/, '' ) ).split(',')
                
                console.log(pSql)
                //console.log(productsSql)
                //console.log(productsRequired)
                console.log(productsRequiredValues)
                console.log(vSql)
                //console.log(variationsSql)
                //console.log(variationsRequired)
                console.log(variationsRequiredValues)


                mysqlConnection.query( pSql, productsRequiredValues, ( error, success, fields ) =>
                {
                    mysqlConnection.query( vSql, variationsRequiredValues, ( error, success, fields ) =>
                    {

                    } )
                } )                

            
                
            //console.log(productsSql)
            //console.log(variationsSql)
            //console.log(productsRequired)
            //console.log(variationsRequired)
            //console.log(sql)
            //console.log(required)
            //console.log([ ...productsRequired, ...variationsRequired ])

            //mysqlConnection.query( sql, [ ...productsRequired, ...variationsRequired ], ( error, products, fields ) =>
                //{ response.send( { success : products } ) } )
        }

    function setImages(images) { for( let i = 0; i <= files.length - 1; i++ ) { files[i].path  ?  images += `${files[i].path}🖼️` : undefined; if( i == files.length -1 ) { return images } } }

    } 
    else response.render( 'administrator/control/products', { RESULT : null } ) 

*/
}




controlComments( request, response, next ) { response.render( 'administrator/control/comments' ) }




controlEmail( request, response, next ) { response.render( 'administrator/control/email' ) }


}




/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = administratorsController