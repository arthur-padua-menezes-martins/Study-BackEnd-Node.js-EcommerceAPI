

/*AUTHENTICATION MODULES*/
const jwt = require('jsonwebtoken')
const secret = require('../../config/index.js').secret




class tokensController
{


/*STORE*/
/**********************************************************************************************************************************/
store( request, response, next ) 
{ 
    const { id, name, email, password } = request.user

    jwt.sign( { id, name, email, password }, secret, { expiresIn: '5m' }, (error, token) =>
    {
        if(error)   
            return response.render( 'login', { errors :`falha na autenticação`, success : null, token : null } )
            
        return response.render( 'login', { errors : null, success : `login realizado com sucesso`, token : `Bearer ${token}` } )
})}


/*CHECK*/
/**********************************************************************************************************************************/
check( request, response, next )
{
    if(!request.headers.authorization)
        return response.status(401).render( 'login', { errors : `falha na autenticação. o usuário necessita realizar o login`, success : null , token : null } )
    
    var code = request.headers.authorization.split(' ')
    var [ , Token ] = code  
    
    if(!request.headers.authorization)
        return response.status(401).json({ errors : `falha na autenticação. não há nenhum token no cabeçalho de autenticação` })
    
    if(!code.length === 2)
        return response.status(401).json({ errors : `falha na autenticação. o token não pode ser dividido` })

    jwt.verify( Token, secret, (error, token) =>
    {
        if(error)
            return response.status(401).json({ errors : `falha na autenticação. o token não pode ser verificado corretamente` })
            
        request.headers.authorization = token
            next()
})}


/*REMOVE*/
/**********************************************************************************************************************************/
logout( request, response, next ) 
{ 
    request.headers.authorization = undefined
    return response.json({ auth : request.headers.authorization })
}


}



/*EXPORTS*/
/**********************************************************************************************************************************/
module.exports = tokensController