

/*CRYPTOGRAPHY MODULES*/
const crypto = require('crypto')

/*DATABASE MODULES*/
const define = require('../../models/database/define/define.js')
const mysqlConnection = require('../../models/database/define/connect.js')[0]




class searchsController 
{


/*404*/
async page404( request, response, next ) { response.render( `search/404.ejs` ) }


/*show products*/
async products( request, response, next )
{ try {

    if( request.method == 'GET' )
    {
        const 
            { product, category, reference } = request.params,
            p = `product = '${product}'`,
            c = `category = '${category}'`,
            r = `reference = '${reference}'`

        if( product  &&  !category  &&  !reference )   
            { query( p, 3, 0 ) }


        if( product  &&  category  &&  !reference )
            { query( `${p} AND ${c}`, 3, 0 ) } 


        if( product  &&  category  &&  reference )
            { query( `${p} AND ${c} AND ${r}`, 1, 0 ) } 

            
        function query( search, limit, offset )
        {
            mysqlConnection.query( `SELECT COUNT(*) AS 'count' FROM products WHERE ${search}`, ( error, pages, fields ) =>
            {
                mysqlConnection.query( `SELECT * FROM products INNER JOIN variations ON products.id = variations.productId AND ${search} LIMIT ${limit} OFFSET ${offset}`, ( error, result, fields ) =>
                    { !error  ?  response.render( 'search/search.ejs', { result, product, category, reference, pages : Math.ceil( pages[0]['count'] / 3 ), session : request.session.user } )  :  next() } )
            })
        }     
    }


    if( request.method == 'POST' )
    {
        const 
            { product, category, reference, pages, filter, productId, userId, stars, comment } = request.body,
            offset  =  pages != 1  ?  3 * parseInt( pages - 1 )  :  0,
            p = `product = '${product}'`,
            c = `category = '${category}'`,
            r = `reference = '${reference}'`,
            o = filter  ?  `ORDER BY variations.${ filter.split('-')[0] } ${ filter.split('-')[1] }`  :  null

        if( productId  &&  userId  &&  stars  &&  comment )
            { return { request : request.comments = { productId, userId, stars, comment }, next : next() } }
        if( empty(pages)  &&  empty(filter) )
            { return { request : request.comments = {}, next : next() } }
        

        if( product  &&  empty(category)  &&  empty(reference)  &&  empty(filter) ) 
            { pagination( p, 3, offset ) }
        if( product  &&  empty(category)  &&  empty(reference)  &&  filter ) 
            { pagination( p, 3, offset, o ) }


        if( product  &&  category  &&  empty(reference)  &&  empty(filter) ) 
            { pagination( `${p} AND ${c}`, 3, offset ) }


        function pagination( search, limit, offset, order = '' )
        {
            mysqlConnection.query( `SELECT * FROM products INNER JOIN variations ON products.id = variations.productId AND ${search} ${order} LIMIT ${limit} OFFSET ${offset}`, ( error, result, fields ) =>
                { !error  ?  response.send( result )  :  response.status(204) } )
        }
    }
  
    function empty( reference ) 
        { return reference == ''  ?  true  :  false }

} catch ( error ) { next() } }


}




/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = searchsController