/*CRYPTOGRAPHY MODULES*/
const crypto = require('crypto')

module.exports =
{
    crypto : ( password, salt ) => 
    { 
        return crypto.pbkdf2Sync( password, salt, 8, 256, 'sha512' ).toString('hex') 
    },


    searchSqlConstructor : ( iterator ) => 
    {
        var 
            sql = String(),
            required = String()

        for( const key in iterator ) 
        {
            if( iterator[key] != ''  &&  key != 'pages'  &&  key != 'filter' )
            {
                if( Object.keys( iterator ).length > 1 )
                { 
                    sql += `${key}=? AND `
                    required += `${iterator[key]},` 
                }
                else if( Object.keys( iterator ).length === 1 )
                { 
                    sql += `${key}=?`
                    required += `${iterator[key]}` 
                }
            }
        }
        return [ sqlReplacer(sql), spliter(required) ]
    },


    ControlProductsSqlConstructor : ( iterator, insert = false, update = false ) =>
    {
        var 
            sql = String(),
            required = String(),
            productsSql = String(),
            productsRequired = String(),
            productsRequiredValues = String(),
            variationsSql = String(),
            variationsRequired = String(),
            variationsRequiredValues = String()

        for( const key in iterator ) 
        {
            if( iterator[key] != ''  &&  key != 'select'  &&  key != 'insert'  &&  key != 'update' )
            {
                if( !insert  &&  !update )
                {
                    if( Object.keys( iterator ).length -1 > 1 )
                    { 
                        sql += `${key}=?,`
                        required += `${iterator[key]},` 
                    }
                    else if( Object.keys( iterator ).length -1 === 1 )
                    { 
                        sql += `${key}=?`
                        required += `${iterator[key]}` 
                    }
                }
                if( insert )
                {
                    if( key == 'reference' || key == 'product' || key == 'category' || key == 'stars' || key == 'description' || key == 'techinical_information' || key == 'link' )
                    { 
                        productsSql += `${key},`
                        productsRequired += `?,`
                        productsRequiredValues += `${iterator[key]},` 
                    }
                    else
                    {
                        variationsSql += `${key},`
                        variationsRequired += `?,`
                        variationsRequiredValues += `${iterator[key]},` 
                    }
                }
                if( update )
                {
                   if( key != 'update' && key != 'reference' )
                   {
                         if( key == 'product' || key == 'category' || key == 'stars' || key == 'description' || key == 'techinical_information' || key == 'link' )
                        { 
                            productsSql += `${key} = ?,`
                            productsRequiredValues += `${iterator[key]},` 
                        }
                        else
                        {
                            variationsSql += `${key} = ?,`
                            variationsRequiredValues += `${iterator[key]},` 
                        }
                   }
                }
            }
        }
        if( !insert  &&  !update ) 
        { 
            return [ sql, required ] 
        }
        if( insert )   
        {  
            productsSql += `link`
            productsRequired += `?`
            productsRequiredValues += `http://localhost:9999/${iterator.product}/${iterator.category}/${iterator.reference}`  
            return [ productsSql, productsRequired, spliter(productsRequiredValues), replacer(variationsSql), replacer(variationsRequired), spliter(variationsRequiredValues) ] 
        }
        if( update ) 
        { 
            return [ replacer(productsSql), spliter(productsRequiredValues), replacer(variationsSql), spliter(variationsRequiredValues) ] 
        }

        
    }
}

function sqlReplacer( value ) { return value.replace( /\sAND\s$/, '' ) }
function replacer( value ) { return value.replace( /,$/, '' ) }
function spliter( value ) { return ( replacer(value) ).split(',') }