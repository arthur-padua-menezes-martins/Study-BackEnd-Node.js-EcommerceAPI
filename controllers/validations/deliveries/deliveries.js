const { where } = require("../../../models/database/MongoDB/Schema/users.js")

/*DATABASE MODULES*/
const 
    mongoose = require(`mongoose`),
    products = mongoose.model(`products`),
    variations = mongoose.model(`variations`),

/*INTEGRATIONS MODULES*/
    { calculateShipping } = require(`../../integrations/correios/correios.js`)


module.exports =
{
    valueAndDeliveryTime : async ( Cep, Cart, Deliveries ) =>
    { try {

        const shipping = await calculateShipping( Cep, await Promise.all
        (
            Cart.map( async iterator =>
            {
                iterator.products = await products.findById( iterator.products )
                iterator.variations = await variations.findById( iterator.variations )
                return iterator
            }) 
        ))

        let verify 

        shipping.map( shipping =>
        {
            if( Deliveries.type == shipping.Codigo)
            { 
                verify = Deliveries.type == shipping.Codigo  &&  shipping.Valor.replace( `,`, `.` ) == Deliveries.value  &&  shipping.PrazoEntrega == Deliveries.deadline 
            }
        })

        return verify

    } catch ( error ) { console.error( error ) } }
}