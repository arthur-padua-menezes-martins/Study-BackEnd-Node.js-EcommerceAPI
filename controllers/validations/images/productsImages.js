module.exports =
{
    productsImages : async ( files ) =>
    {
        let 
            mimetype = [ `image/jpeg` ],
            maxSize = 1000000,
            keys = []

        await files.map( iterator => 
        { 
            iterator.mimetype == mimetype.map( iterator => iterator )  &&  iterator.size < maxSize  ?  keys.push(true)  :  keys.push(false) 
        })
        
        return keys.every( ( key ) => { return Boolean( key ) } ) 
    }
}