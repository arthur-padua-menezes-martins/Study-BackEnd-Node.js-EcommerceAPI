const 
    mongoose = require(`mongoose`),
    products = mongoose.model(`products`),
    variations = mongoose.model(`variations`)


module.exports = 
{
    purchasePrice : async ( Cart, Deliveries, Payments ) =>
    { try {

        const cart = await Promise.all
        (
            Cart.map( async ( iterator ) =>
            {
                iterator.products = await products.findById( iterator.products )
                iterator.variations = await variations.findById( iterator.variations )
                return iterator
            })
        )

        let purchasePrice = Deliveries.value += cart.reduce( (acumulator,iterator) => acumulator + iterator.quantity * iterator.unitaryValue, 0 )

        return Boolean( purchasePrice.toFixed(2) == Payments.value.toFixed(2)  &&  Payments.installment <= 6 )

    } catch ( error ) { console.error( error ) } },


    paymentMethod : async ( Payments ) =>
    { try {

        if( Payments.paymentMethod == `creditCard` )
        {
            return true
        }
        else if( Payments.paymentMethod == `boleto` )
        {
            return true
        }
        else
        {
            return false
        }
    
    } catch ( error ) { console.error( error ) } }
}