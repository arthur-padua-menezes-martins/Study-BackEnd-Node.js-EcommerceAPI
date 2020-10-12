const
    mongoose = require(`mongoose`),
    variations = mongoose.model(`variations`)

module.exports =
{
    availableQuantity: async (Cart) => {
        try {

            let validator, cart

            cart = await Promise.all(Cart.map(async iterator => {
                iterator.variations = await variations.findById(iterator.variations || iterator.variations._id)
                return iterator
            }))

            cart.forEach(async iterator => {
                if (iterator.variations.quantityInStock && iterator.variations.quantityInStock > iterator.quantity) {
                    validator = true
                } else {
                    validator = false
                }
            })

            return validator

        } catch (error) { return false }
    },

    updateQuantityInStock: async (Requests, type) => {
        try {

            await Promise.all(Requests.cart.map(async iterator => {

                iterator.variations = await variations.findById(iterator.variations._id || iterator.variations)

                let { quantityInStock, quantityInTransaction } = iterator.variations, { quantity } = iterator

                if (type == `save`) {
                    quantityInStock -= quantity
                    quantityInTransaction += quantity
                }

                if (type == `confirm`) {
                    quantityInTransaction -= quantity
                }

                if (type == `canceled`) {
                    quantityInStock += quantity
                    quantityInTransaction -= quantity
                }

                iterator.variations.quantityInStock = quantityInStock
                iterator.variations.quantityInTransaction = quantityInTransaction

                await iterator.variations.save()
                return iterator

            }))

            return true

        } catch (error) { console.error(error) }
    }
}