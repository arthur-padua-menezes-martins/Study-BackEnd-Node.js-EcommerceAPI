

/*BASIC MODULES*/
const express = require('express')
const app = express()

/*CRYPTOGRAPHY MODULES*/
const crypto = require('crypto')

/*DATABASE MODULES*/
const mysqlConnection = require('../../models/database/define/connect.js')[0]

/*HELPERS MODULES*/
helpers = require('../../helpers/function.js')




class searchsController 
{


async page404( request, response, next ) { response.render( `search/404.ejs` ) }


async products( request, response, next )
{ try {

    if( request.method == 'GET' )
    {
        const 
            { params } = request,
            { product, category, reference } = params

        if( product  &&  !category  &&  !reference )   
            { select( params, 3, 0 ) }


        if( product  &&  category  &&  !reference )
            { select( params, 3, 0 ) } 


        if( product  &&  category  &&  reference )
            { select( params, 1, 0 ) } 

            
        function select( iterator, limit, offset )
        {
            let [ sql, required ] = helpers.searchSqlConstructor( iterator ),
            count = `SELECT COUNT(*) AS 'count' FROM products WHERE ${sql}`                
            sql = `SELECT * FROM products INNER JOIN variations ON products.id = variations.productId AND ${sql} LIMIT ? OFFSET ?`

            mysqlConnection.query( count, required, ( error, pages, fields ) =>
            {
                mysqlConnection.query( sql, [ ...required, limit, offset ], ( error, products, fields ) =>
                    { !error  ?  response.render( 'search/search.ejs', { products, product, category, reference, pages : Math.ceil( pages[0]['count'] / 3 ), session : request.session.user } )  :  next() } )
            })
        }     
    }


    if( request.method == 'POST' )
    {
        const 
            { body } = request,
            { product, category, reference, pages, filter, productId, userId, stars, comment } = body,
            offset  =  pages != 1  ?  3 * parseInt( pages - 1 )  :  0,
            order = filter  ?  `variations.${ filter.split('-')[0] } ${ filter.split('-')[1] }`  :  null

        if( productId  &&  userId  &&  stars  &&  comment )
        { 
            request.comments = { productId, userId, stars, comment }
            next()  
        }
        if( empty(pages)  &&  empty(filter) )
        { 
            request.comments = {}
            next() 
        }
        

        if( product  &&  empty(category)  &&  empty(reference)  &&  empty(filter) ) 
            { pagination( body, 3, offset ) }
        if( product  &&  empty(category)  &&  empty(reference)  &&  filter ) 
            { pagination( body, 3, offset, order ) }


        if( product  &&  category  &&  empty(reference)  &&  empty(filter) ) 
            { pagination( body, 3, offset ) }
        if( product  &&  category  &&  empty(reference)  &&  filter ) 
            { pagination( body, 3, offset, order ) }


        function pagination( iterator, limit, offset, order = '' )
        {
            let [ sql, required ] = helpers.searchSqlConstructor( iterator )
                
            if( empty(order) )
                sql = `SELECT * FROM products INNER JOIN variations ON products.id = variations.productId AND ${sql} LIMIT ? OFFSET ?` 
            else
                sql = `SELECT * FROM products INNER JOIN variations ON products.id = variations.productId AND ${sql} ORDER BY ${order} LIMIT ? OFFSET ?` 
            
            mysqlConnection.query( sql, [ ...required, limit, offset ], ( error, products, fields ) =>
                { !error  ?  response.send( products )  :  response.status(204) } )
        }
    }
  
    function empty( reference ) 
        { return reference == ''  ?  true  :  false }

} catch ( error ) { next() } }


}




/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = searchsController