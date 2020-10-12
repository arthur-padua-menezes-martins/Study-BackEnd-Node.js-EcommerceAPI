var load = {}, discart = []

module.exports =
{
    find : async ( schema ) =>
    {
        schema.find().then( ( result ) => { return result } )
    },

    
    search : async ( head, exclude = [``] ) =>
    {
        var search = {}

        for( const key in head ) 
        { 
            Boolean( head[key] )  &&  key != exclude.map( iterator => ( iterator ) )  ?  search[key] = head[key]  :  `` 
        }

        return search
    },

    create : async () =>
    {

    },


    update : async ( result, payload, exclude = [``] ) =>
    {
        //console.log(result)
        //console.log(payload)

        for( const key in payload )
        {
            payload[key]===`true`  ?  true  :  payload[key]===`false`  ?  false  :  payload[key]
            payload[key]!==undefined  ?  load[key] = payload[key]  :  discart.push(key)
        }

        for( const key in load )
        {
            result[key] = load[key] 

            exclude.map( iterator =>  
            {
                if(key===iterator)
                {
                    delete result[key] 
                } 
            })
        }

        /*[ `address` ].map( iterator =>
        {
            if( Boolean( result[iterator] ) )
            {
                for( const key in result[iterator] )
                {
                    if( payload[key] )
                    {
                        result[iterator][key] = payload[key]
                    }
                }
            }
        })*/

        return result
    },


    delete : async () =>
    {
        
    }
}