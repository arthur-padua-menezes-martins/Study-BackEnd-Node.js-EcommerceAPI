module.exports =
{
    productsQueryConstructor : async ( name, reference ) =>
    {
        switch ( Boolean( name  &&  reference ) )
        {
            case false:
                return { name }
            break

            case true:
                return { name, reference }
            break
        }     
    },

    objectConstructor : async ( object, exclude = [ null ] ) =>
    {
        let exist = {}

        for( const key in object ) { Boolean( object[key] )  &&  key != exclude.map( ( iterator ) => iterator )  ?  exist[key] = object[key]  :  null }

        return exist
    }
}