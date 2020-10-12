/*DATABASE MODULES*/
const   
    products = require(`../../../models/database/MongoDB/Schema/products.js`),
    variations = require(`../../../models/database/MongoDB/Schema/variations.js`)


module.exports = 
{
    cart : async ( Cart ) =>
    {

        const 
            { value : realValue, quantity : quantityReal } = await real( Cart ), 
            { value : ShippedValue, quantity : quantityShipped } = await shipped( Cart )

        return Boolean( realValue == ShippedValue  &&  quantityReal == quantityShipped )


        async function real ( Cart )
        {
            let results, value = quantity = 0

            results = await Promise.all
            (
                Cart.map( async iterator =>
                {
                    let 
                        Products = await products.findById( iterator.products ),
                        Variations = await variations.findById( iterator.variations )
                    
                    if( Products  &&  Variations ) // &&  Products.variations.includes( Variations._id )
                    {
                        value = Variations.value * iterator.quantity
                        quantity = iterator.quantity
                    }
                    
                    return { value, quantity }
                })
            )

            value = await results.reduce( async ( acumulator, iterator ) => acumulator + iterator.value, 0 ), 
            quantity = await results.reduce( async ( acumulator, iterator ) => acumulator + iterator.quantity, 0 ) 

            return { value, quantity }
        }


        async function shipped ( Cart )
        {
            let value = quantity = 0

            await Cart.forEach( iterator =>
            {
                value += iterator.unitaryValue * iterator.quantity
                quantity += iterator.quantity
            }) 

            return { value, quantity }
        }

    }
}