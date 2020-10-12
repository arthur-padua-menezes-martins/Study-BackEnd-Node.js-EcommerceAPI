module.exports =
{
    error400 : ( error, next ) => { error.httpStatusCode = 400; next( error ) },

    error401 : ( error, next ) => { error.httpStatusCode = 401; next( error ) },

    error404 : ( error, next ) => { error.httpStatusCode = 404; next( error ) },

    error422 : ( error, next ) => { error.httpStatusCode = 422; next( error ) }
}