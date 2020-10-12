/*DATABASE MODULES*/
const
    products = require(`../../models/database/MongoDB/Schema/products.js`),
    variations = require(`../../models/database/MongoDB/Schema/variations.js`),
    deliveries = require(`../../models/database/MongoDB/Schema/deliveries.js`),
    recordsRequests = require(`../../models/database/MongoDB/Schema/recordsRequests.js`),

    /*HELPERS MODULES*/
    constructors = require(`../../helpers/function/constructors.js`),
    setErrorStatus = require(`../../helpers/error/setErrorStatus.js`),

    /*INTEGRATIONS MODULES*/
    { calculateShipping } = require(`../integrations/correios/correios.js`)




class deliveriesController {


    async view(request, response, next) {
        try {

            const { params, session } = request, { _id } = params, { user } = session, error = new Error()
            var [Deliveries] = await deliveries.find(await constructors.objectConstructor({ requests: _id })).populate(`requests`)

            if (Deliveries.requests.users == user._id) {
                response.send({ Deliveries, RecordsRequests: await recordsRequests.find({ requests: Deliveries.requests || null }) })
            }
            else {
                setErrorStatus.Error401(error, next)
            }

        } catch (error) { console.error(error) }
    }




    async calculate(request, response, next) {
        try {

            const { body } = request, { Cep, Cart } = body

            response.send(await calculateShipping(Cep, await Promise.all(Cart.map(async iterator => {

                iterator.products = await products.findById(iterator.products)
                iterator.variations = await variations.findById(iterator.variations)
                return iterator

            }))))

        } catch (error) { console.error(error) }
    }


}



module.exports = deliveriesController