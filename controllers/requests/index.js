const { request } = require('express')

/*DATABASE MODULES*/
const
    mongoose = require('mongoose'),
    users = require('../../models/database/MongoDB/Schema/users.js'),
    products = require('../../models/database/MongoDB/Schema/products.js'),
    variations = require('../../models/database/MongoDB/Schema/variations.js'),
    requests = require('../../models/database/MongoDB/Schema/requests.js'),
    payments = require('../../models/database/MongoDB/Schema/payments.js'),
    deliveries = require('../../models/database/MongoDB/Schema/deliveries.js'),
    recordsRequests = require('../../models/database/MongoDB/Schema/recordsRequests.js'),

    /*HELPERS MODULES*/
    constructors = require(`../../helpers/function/constructors.js`),
    verify = require(`../../helpers/function/verify.js`),
    setErrorStatus = require(`../../helpers/error/setErrorStatus.js`),
    userMessages = require(`../../helpers/message/userMessages.js`),

    /*VALIDATIONS MODULES*/
    validationsRequests = require(`../validations/requests/cart.js`),
    validationsDeliveries = require(`../validations/deliveries/deliveries.js`),
    validationsPayments = require(`../validations/payments/payments.js`),
    validationsVariations = require(`../validations/variations/index.js`)
var ObjectId = require('mongodb').ObjectID;

class requestsController {

    async viewCart(request, response, next) {
        try {

            const { params, session } = request, { user } = session, error = new Error()
            var [Requests] = await requests.find(await constructors.objectConstructor({ _id: params._id, users: user._id }))

            if (Boolean(Requests)) {

                Requests.cart = await Promise.all(
                    Requests.cart.map(async iterator => {
                        iterator.products = await products.findById(iterator.products)
                        iterator.variations = await variations.findById(iterator.variations)
                        return iterator
                    })  
                )

                response.send(Requests.cart)

            } else {
                setErrorStatus.Error422(error, next)
            }

        } catch (error) { console.error(error) }
    }




    async view(request, response, next) {
        try {

            const { params, session } = request, { user } = session
            let Requests, newDate

            if (request.route.path === '/requests/view/:_id?' && params._id === undefined) {

                Requests = await requests.find({
                    users: user._id
                }, {})
                    .select({ _id: 1, payments: 1, canceled: 1, createdAt: 1 })
                    .populate({ path: 'payments', select: 'status value' })

                Requests.map((Request, index) => {

                    if (verify.every([Request.payments.value], true)) {
                        delete Requests[index]
                    }

                })

                Requests = Requests.filter(Request => Request !== null)

                return response.send({ requests: Requests })

            } else if (request.route.path === '/requests/view/:_id?' && params._id !== undefined) {

                Requests = await requests.findOne({

                    _id: ObjectId((params._id).trim()),
                    users: user._id

                }, {})
                    .populate({ path: 'users' })
                    .populate({ path: 'deliveries' })
                    .populate({ path: 'payments' })

                Requests.cart = await Promise.all(
                    Requests.cart.map(async iterator => {
                        iterator.products = await products.findById(iterator.products)
                        return iterator
                    })  
                )


                console.log(Requests)
                return response.send({ requests: Requests })

            }

        } catch (error) { console.error(error) }
    }




    async create(request, response, next) {
        try {

            const { body, session } = request, { user } = session, { Cep, Cart, Deliveries, Payments, Whatsapp } = body, cart = Cart.slice(), error = new Error()

            if (await validationsVariations.availableQuantity(Cart)) {

                var newRequests, newDeliveries, newPayments, newRecordsRequests

                if (Whatsapp) {
                    console.log(body)
                    newDeliveries = await new deliveries(await constructors.objectConstructor({ ...Deliveries, ...{ status: [1], whatsapp: true } }))
                    newPayments = await new payments(await constructors.objectConstructor({ ...Payments, ...{ status: [1], whatsapp: true } }))
                    newRequests = await new requests(await constructors.objectConstructor({ users: user._id, cart, payments: newPayments._id, whatsapp: true }))
                    newRecordsRequests = await new recordsRequests(await constructors.objectConstructor({ type: `whatsapp`, situation: 1, requests: newRequests._id, whatsapp: true }))
                    newDeliveries.requests = newRequests._id
                    newPayments.requests = newRequests._id

                    await newDeliveries.save()
                    await newPayments.save()
                    await newRequests.save()
                    await newRecordsRequests.save()
                    await validationsVariations.updateQuantityInStock(newRequests, `save`)

                    return response.send(Object.assign({ Requests: Object.assign({}, newRequests, { Users: await users.findById(user._id).select([`_id`, `name`, `email`, `cpf`, `phone`, `dateOfBirth`]), Payments: newPayments, RecordsRequests: newRecordsRequests, Whatsapp: true }) }))

                }

                if (!Whatsapp && await validationsRequests.cart(Cart) && await validationsDeliveries.valueAndDeliveryTime(Cep, Cart, Deliveries) && await validationsPayments.purchasePrice(Cart, Deliveries, Payments) && await validationsPayments.paymentMethod(Payments)) {

                    newDeliveries = await new deliveries(await constructors.objectConstructor({ ...Deliveries, ...{ status: [1] } }))
                    newPayments = await new payments(await constructors.objectConstructor({ ...Payments, ...{ status: [1] } }))
                    newRequests = await new requests(await constructors.objectConstructor({ users: user._id, cart, deliveries: newDeliveries._id, payments: newPayments._id }))
                    newRecordsRequests = await new recordsRequests(await constructors.objectConstructor({ type: `payment`, situation: 1, requests: newRequests._id }))
                    newDeliveries.requests = newRequests._id
                    newPayments.requests = newRequests._id

                    await newDeliveries.save()
                    await newPayments.save()
                    await newRequests.save()
                    await newRecordsRequests.save()
                    await validationsVariations.updateQuantityInStock(newRequests, `save`)

                    return response.send(Object.assign({ Requests: Object.assign({}, newRequests, { Users: await users.findById(user._id).select([`_id`, `name`, `email`, `cpf`, `phone`, `dateOfBirth`]), Deliveries: newDeliveries, Payments: newPayments, RecordsRequests: newRecordsRequests }) }))

                } else { setErrorStatus.error400(error, next) }

            } else { userMessages.RequestsError[0] }

        } catch (error) { console.error(error) }
    }



    async remove(request, response, next) {
        try {

            const { body, params, session } = request, { user } = session
            var Requests = await requests.findOne({ _id: body._id || params._id, users: user._id || params.user_id })

            if (Boolean(Requests)) {
                await (Requests.canceled = true).save()
                await (await new recordsRequests(await constructors.objectConstructor({ type: `canceled`, situation: 0, requests: Requests._id }))).save()
                await validationsVariations.updateQuantityInStock(Requests, `canceled`)
                response.send({ canceled: true })
            } else {
                setErrorStatus.Error422(error, next)
            }

        } catch (error) { console.error(error) }
    }

}
module.exports = requestsController