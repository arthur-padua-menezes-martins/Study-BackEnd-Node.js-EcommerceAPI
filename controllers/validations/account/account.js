/*HELPERS MODULES*/
    const verify = require(`../../../helpers/function/verify.js`)

module.exports = 
{
    all : async body => 
    {
        let validator = []
        const validationFunctions =
        {
            name : async info => { validator.push( info.match(  )  ?  true  :  false ) },
            email : async info => { validator.push( info.match( /\S+@\S+\.\S+/ )  ?  true  :  false ) },
            password : async info => { validator.push( info.match(  )  ?  true  :  false ) },
            cpf : async info => { validator.push( info.match(  )  ?  true  :  false ) },
            phone : async info => { validator.push( info.match(  )  ?  true  :  false ) },
            dateOfBirth : async info => { validator.push( info.match(  )  ?  true  :  false ) },
            street : async info => { validator.push( info.match(  )  ?  true  :  false ) },
            number : async info => { validator.push( info.match(  )  ?  true  :  false ) },
            district : async info => { validator.push( info.match(  )  ?  true  :  false ) },
            city : async info => { validator.push( info.match(  )  ?  true  :  false ) },
            state : async info => { validator.push( info.match(  )  ?  true  :  false ) },
            cep : async info => { validator.push( info.match(  )  ?  true  :  false ) }
        }

        for( const key in body ) { if( validationFunctions.hasOwnProperty( key ) ) { validationFunctions[key]( body[key] ) } }; console.log(validator)
        
        return verify.every( validator )
    }
}