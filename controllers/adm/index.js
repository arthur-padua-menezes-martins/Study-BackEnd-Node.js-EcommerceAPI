/*DATABASE MODULES*/
const
    users = require(`../../models/database/MongoDB/Schema/users.js`),
    categories = require(`../../models/database/MongoDB/Schema/categories.js`),
    products = require(`../../models/database/MongoDB/Schema/products.js`),
    variations = require(`../../models/database/MongoDB/Schema/variations.js`),
    assessments = require(`../../models/database/MongoDB/Schema/assessments.js`),
    requests = require(`../../models/database/MongoDB/Schema/requests.js`),
    recordsRequests = require(`../../models/database/MongoDB/Schema/recordsRequests.js`),
    deliveries = require(`../../models/database/MongoDB/Schema/deliveries.js`),
    payments = require(`../../models/database/MongoDB/Schema/payments.js`),

    /*HELPERS MODULES*/
    constructors = require(`../../helpers/function/constructors.js`),
    database = require(`../../helpers/function/database.js`),
    verify = require(`../../helpers/function/verify.js`),
    setErrorStatus = require(`../../helpers/error/setErrorStatus.js`),

    /*VALIDATIONS MODULES*/
    validationsImages = require(`../validations/images/productsImages.js`),
    validationsVariations = require(`../validations/variations/index.js`)


class admController {


    /*SEARCH*/
    /**********************************************************************************************************************************/
    async search(request, response, next) { response.render(`administrator/search/users`) }




    async searchUsers(request, response, next) {
        try {

            const { params } = request, { _id } = params, offset = 0, limit = 30

            if (Boolean(_id)) {

                users.findById(_id).then(async User => {
                    if (Boolean(User)) {
                        search(response, User)
                    }
                })

            } else {

                users.paginate(
                    {}, { offset, limit }
                ).then((User) => {
                    search(response, User.docs)
                })

            }


            function search(response, User) { response.render(`adm/search/users/users.ejs`, { User }) }

        } catch (error) { console.error(error) }
    }




    async searchAssessments(request, response, next) {

        const { params } = request, { _id } = params, offset = 0, limit = 30

        if (Boolean(_id)) {
            assessments.findById(_id).then(async (Assessments) => {
                if (Boolean(Assessments)) {
                    search(response, Assessments)
                }
            })
        }
        else {
            assessments.paginate({}, { offset, limit }).then((Assessments) => {
                search(response, Assessments.docs)
            })
        }


        function search(response, Assessments) { response.render(`adm/search/assessments/assessments.ejs`, { Assessments }) }

    }




    /*CONTROL*/
    /**********************************************************************************************************************************/
    control(request, response, next) {
        function newUsersToday() {

        }

        function newUsersInTheMonth() {

        }
    }




    async controlUsers(request, response, next) {
        try {

            const { body, params, query, method } = request, { payload, search } = body,
                populate = [`users`, `payments`, `deliveries`], options = { offset: Number(body.offset || query.offset || 0), limit: Number(body.limit || query.limit || 30) }

            if (Boolean(body.create))
                createUsers()
            if (Boolean(body.view || query.view))
                viewUsers()
            if (Boolean(body.update))
                updateUsers()
            if (Boolean(body.remove))
                removeUsers()


            async function viewUsers() {
                try {

                    if (method == `GET`) {
                        if (params._id) {
                            users.findById(params._id).then(async User => response.send({ User }))
                        }
                        else {
                            users.paginate({}, options).then(async Users => response.send({ Users }))
                        }
                    }
                    if (method == `POST`) {
                        if (search) {

                        }
                        else {
                            await requests.paginate({ users: body._id }, { populate, ...options }).then(Requests => {
                                response.send({ UserRequests: Requests })
                            })
                        }
                    }

                } catch (error) { console.error(error) }
            }



            async function updateUsers() {
                try {

                    users.findById(body._id).then(async User => {
                        if (!!User) {
                            User = await database.update(User, payload, [``])
                            await User.save()
                            response.send({ User })
                        }
                    })

                } catch (error) { console.error(error) }
            }

        } catch (error) { console.error(error) }
    }




    async controlAssessments(request, response, next) {
        try {



        } catch (error) { console.error(error) }
    }




    async controlEmail(request, response, next) {

    }




    async controlCategories(request, response, next) {
        try {

            const
                { body, params, query, method } = request, { payload, name, code, availability } = body,
                populate = [`products`], options = { offset: Number(body.offset || query.offset || 0), limit: Number(body.limit || query.limit || 30) }
            var Categories, keys = []


            if (body.create || query.create) createCategories()
            if (body.view || query.view) viewCategories()
            if (body.update) updateCategories()
            if (body.remove) removeCategories()

            async function createCategories() {
                try {

                    Categories = await new categories(await constructors.objectConstructor({ name, code, availability }))
                    await Categories.save()
                    response.send({ Categories })

                } catch (error) { console.error(error) }
            }



            async function viewCategories() {
                try {

                    await Promise.all(
                        await (await categories.find()).map(async Category => {
                            Category.products = await Promise.all(
                                await products.find({ categories: Category._id }).then(Products => (
                                    Products.map(Product => Product._id)
                                ))
                            )
                            Category.save()
                        })
                    )

                    if (method == `GET`) {
                        if (params._id) {
                            response.send({ Categories: await categories.findById(params._id).populate(...populate) })
                        }
                        else {
                            response.send({ Categories: await categories.paginate({}, { populate, ...options }) })
                        }
                    }
                    if (method == `POST`) {

                    }

                } catch (error) { console.error(error) }
            }



            async function updateCategories() {
                try {

                    categories.findById(body._id).then(async Categories => {
                        if (Boolean(Categories)) {
                            Categories = await database.update(Categories, payload, [``])
                            await Categories.save()
                            response.send({ Categories })
                        }
                    })

                } catch (error) { console.error(error) }
            }



            async function removeCategories() {
                try {

                    Categories = await categories.findById(body._id)

                    if (Boolean(Categories)) {
                        await Categories.remove()
                        response.send({ removed: true })
                    }

                } catch (error) { console.error(error) }
            }

        } catch (error) { console.error(error) }
    }




    async controlProducts(request, response, next) {
        try {

            const { body, params, query, method, files } = request, error = new Error(),
                populate = [`categories`, `variations`], options = { offset: Number(body.offset || query.offset || 0), limit: Number(body.limit || query.limit || 30) }
            var Products, Product, search

            if (Boolean(body.create)) createProduct()
            if (Boolean(body.view || query.view)) viewProduct()
            if (Boolean(body.update)) updateProduct()
            if (Boolean(body.remove)) removeProduct()


            async function createProduct() {
                try {

                    Product = new products(await constructors.objectConstructor({ ...body }, [`create`]))
                    await Product.save()
                    response.send({ Product })

                } catch (error) { console.error(error) }
            }



            async function viewProduct() {
                try {

                    await Promise.all(
                        await (await products.find()).map(async Product => {
                            Product.variations = await Promise.all(
                                await variations.find({ products: Product._id }).then(Variations => (
                                    Variations.map(Variations => Variations._id)
                                ))
                            )
                            Product.save()
                        })
                    )

                    if (method === `GET`) {
                        if (params._id) {
                            await products.findById(params._id).populate(populate).then(Product => {
                                response.send({ Product })
                            })
                        }
                        else {
                            await products.paginate({}, { populate, ...options }).then(Products => {
                                response.send({ Products })
                            })
                        }
                    }
                    if (method === `POST`) {

                    }

                } catch (error) { console.error(error) }
            }



            async function updateProduct() {
                try {


                    if (Boolean(body._id))
                        products.findById(body._id).then(Product => update(Product))


                    async function update(Product) {
                        if (verify.notNull(Product)) {
                            Products = await database.update(Product, body, [`update`, `categories`])

                            if (Boolean(files)) {
                                if (await validationsImages.productsImages(files)) {
                                    Products.images = Products.images.filter(iterator => iterator).concat(files.map(iterator => iterator.path))
                                }
                            }

                            await Products.save()
                            response.send({ Products })
                        }
                    }

                } catch (error) { console.error(error) }
            }



            async function removeProduct() {
                try {

                    await products.findByIdAndDelete(body._id || params._id).then((success) => {
                        Boolean(success) ? response.send({ removed: true }) : response.send({ removed: false })
                    })

                } catch (error) { console.error(error) }
            }

        } catch (error) { console.error(error) }
    }




    async controlVariations(request, response, next) {
        try {

            const { body, params, query, file, files } = request, { payload } = body, populate = [`products`], error = new Error()
            let variation = {}, created = {}, exclude = [], search


            if (body.create || query.create) createVariations()
            if (body.view || query.view) viewVariations()
            if (body.update || query.update) updateVariations()
            if (body.remove || query.remove) removeVariations()
            if (body.removeImages || query.removeImages) removeImages()


            async function createVariations() {
                try {

                    for (const Key in body) { Boolean(body[Key]) ? created[Key] = body[Key] : exclude.push(Key) }
                    for (const key in created) { key != `create` ? variation[key] = created[key] : `` }

                    const Variations = new variations(variation)
                    await Variations.save()
                    response.send(Variations)

                } catch (error) { console.error(error) }
            }



            async function viewVariations() {
                try {

                    if (params._id) {
                        await variations.find({ _id: params._id }).populate(...populate).then(async Variations => {
                            response.send(Variations)
                        })
                    }
                    else {
                        search = await database.search(body, [`view`])

                        if (verify.notNull(search)) {
                            variations.find(search).populate(...populate).then(Variations => { response.send(Variations) })
                        }
                        else {
                            variations.find().populate(...populate).then(async Variations => {

                                Variations = await Promise.all(Variations.map(async Variations => {
                                    Variations.products = await Promise.all(Variations.products.map(async Variations => {
                                        Variations.categories = await categories.findById(Variations.categories)
                                        return Variations
                                    }))
                                    return Variations
                                }))

                                response.send({ Variations })
                            })
                        }
                    }

                } catch (error) { console.error(error) }
            }



            async function updateVariations() {
                try {

                    variations.findById(params._id).then(async Variation => {
                        if (Variation) {
                            Variation = await database.update(Variation, payload, [])

                            if (files) {
                                if (await validationsImages.productsImages(files)) {
                                    Variation.images = Variation.images.concat(files.map(iterator => iterator.path))
                                }
                            }

                            await Variation.save()
                            response.send({ Product: await products.findById(Variation.products).populate([`categories`, `variations`]) })
                        }
                    })

                } catch (error) { console.error(error) }
            }



            async function removeVariations() {
                try {

                } catch (error) { console.error(error) }
            }



            async function removeImages() {
                try {

                    if (body.index) {
                        variations.findById(params._id).then(async Variation => {
                            Variation.images = Variation.images.filter((src, index) => index !== body.index)
                            await Variation.save()
                        })
                    }
                    else {

                    }

                } catch (error) { console.error(error) }
            }

        } catch (error) { console.error(error) }
    }




    async controlRequests(request, response, next) {
        try {

            const { body, params, query } = request, { payload } = body, error = new Error(),
                populate = [`users`, `payments`, `deliveries`], options = { offset: Number(body.offset || query.offset || 0), limit: Number(body.limit || query.limit || 30) }
            var Requests, Request

            if (body.cart || query.cart)
                cartRequests()
            if (body.view || query.view)
                viewRequests()
            if (body.create || query.create)
                createRequests()
            if (body.update || query.update)
                updateRequests()
            if (body.remove || query.remove)
                removeRequests()


            async function cartRequests() {
                try {

                    if (request.method === `GET`) {
                        if (params._id) {
                            Request = await requests.findById(params._id)

                            if (!!Request) {
                                Request.cart = await Promise.all(Request.cart.map(async Request => {
                                    Request.products = await products.findById(Request.products)
                                    Request.variations = await variations.findById(Request.variations)
                                    return Request
                                }))
                                response.send({ Request })
                            }
                            else {
                                setErrorStatus.error400(error, next)
                            }
                        }
                        else {
                            setErrorStatus.error400(error, next)
                        }
                    }
                    if (request.method === `POST`) {

                    }

                } catch (error) { console.error(error) }
            }



            async function viewRequests() {
                try {

                    if (request.method == `GET`) {
                        if (params._id) {
                            Request = await requests.findById(params._id).populate(...populate)

                            if (!!Request) {
                                Request.cart = await Promise.all(Request.cart.map(async iterator => {
                                    iterator.products = await products.findById(iterator.products)
                                    iterator.variations = await variations.findById(iterator.variations)
                                    return iterator
                                }))
                                response.send({ Request, RecordsRequest: await recordsRequests.find({ requests: Request._id }) })
                            }
                            else {
                                setErrorStatus.Error422(error, next)
                            }
                        }
                        else {
                            Requests = await requests.paginate({}, { populate, ...options })

                            Requests.docs = await Promise.all(Requests.docs.map(async Requests => {
                                Requests.cart = await Promise.all(Requests.cart.map(async Request => {
                                    Request.products = await variations.findById(Request.products)
                                    Request.variations = await variations.findById(Request.variations)
                                    return Request
                                }))
                                return Requests
                            }))
                            response.send({ Requests })
                        }
                    }
                    if (requestmethod == `POST`) {

                    }

                } catch (error) { console.error(error) }
            }



            async function createRequests() {
                try {



                } catch (error) { console.error(error) }
            }



            async function updateRequests() {
                try {



                } catch (error) { console.error(error) }
            }



            async function removeRequests() {
                try {

                    let Requests = await requests.findById(body._id || query._id)

                    if (!!Requests) {
                        if (Requests.canceled) {
                            response.send({ canceled: true })
                        }
                        else {
                            Requests.canceled = true
                            Requests.save()

                            await validationsVariations.updateQuantityInStock(Requests, `canceled`)

                            response.send({ canceled: true })
                        }
                    }
                    else {
                        setErrorStatus.Error422(error, next)
                    }

                } catch (error) { console.error(error) }
            }

        } catch (error) { console.error(error) }
    }




    async controlDeliveries(request, response, next) {
        try {

            const { body, params } = request, { status } = body, { _id } = params, error = new Error()
            var Deliveries, Delivery, newRecordsRequests

            if (body.view)
                viewDeliveries()
            if (body.trackingCode)
                updateDeliveriesTrackingCode()
            if (body.update)
                updateDeliveriesStatus()
            if (body.remove)
                removeDeliveriesStatus()


            async function viewDeliveries() {
                try {

                    Deliveries = await deliveries.find(await constructors.objectConstructor({ _id }))
                    response.send({ Deliveries, RecordsRequests: await Promise.all(Deliveries.map(async delivery => { return recordsRequests.find({ requests: delivery.requests }) })) })

                } catch (error) { console.error(error) }
            }



            async function updateDeliveriesTrackingCode() {
                try {

                    Delivery = await deliveries.findById(_id)

                    if (Delivery && status) {
                        Delivery.trackingCode = status
                        newRecordsRequests = await new recordsRequests({ type: `delivery`, situation: 0, requests: Delivery.requests })

                        Delivery.save()
                        newRecordsRequests.save()

                        response.send({ Delivery })
                    }
                    else {
                        setErrorStatus.error400(error, next)
                    }

                } catch (error) { console.error(error) }
            }



            async function updateDeliveriesStatus() {
                try {

                    Delivery = await deliveries.findById(_id)

                    if (Delivery && status) {
                        Delivery.status = status
                        newRecordsRequests = await new recordsRequests({ type: `delivery`, situation: status, requests: Delivery.requests })

                        await Delivery.save()
                        await newRecordsRequests.save()

                        response.send({ Delivery })
                    }
                    else {
                        setErrorStatus.error400(error, next)
                    }

                } catch (error) { console.error(error) }
            }



            async function removeDeliveriesStatus() {
                try {

                    recordsRequests.find({ requests: _id }).then(async RecordsRequests => {
                        var [RecordRequest] = RecordsRequests.filter((iterator, index) => index == status)
                        await recordsRequests.findByIdAndDelete(RecordRequest._id)
                    })

                } catch (error) { console.error(error) }
            }

            /*
                async function updateDeliveries( response )
                { try {
             
                    Delivery = await deliveries.findById( _id )
                    RecordsRequests = await new recordsRequests( { type : `delivery`, payload : body, requests : Delivery.requests } )
                    
                    Delivery = await database.update( Deliveries, body, [ `_id` ] ) 
                    await Delivery.save()
                    await RecordsRequests.save()
            
                    response.send( { Delivery, RecordsRequests } )
            
                } catch (error) { console.error(error) } }
            */
        } catch (error) { console.error(error) }
    }




    async controlPayments(request, response, next) {
        try {

            const { body, params } = request, { status } = body, { _id } = params, error = new Error()
            var Payment, Request, newRecordsRequests

            if (body.update)
                updatePaymentsStatus()
            if (body.remove)
                removePaymentsStatus()

            async function updatePaymentsStatus() {
                try {

                    Payment = await payments.findById(_id)

                    if (Payment && status) {
                        Payment.status = status
                        Request = await requests.findById(Payment.requests)
                        newRecordsRequests = new recordsRequests(await constructors.objectConstructor({ type: `payment`, situation: status, requests: Payment.requests }))

                        await Payment.save()
                        await newRecordsRequests.save()

                        status == `payment` ?
                            await validationsVariations.updateQuantityInStock(Request, `confirm`) :
                            status == `canceled` ?
                                await validationsVariations.updateQuantityInStock(Request, `canceled`) : null

                        response.send({ Payment })
                    }
                    else {
                        setErrorStatus.error400(error, next)
                    }

                } catch (error) { console.error(error) }
            }



            async function removePaymentsStatus() {
                try {

                    recordsRequests.find({ requests: _id }).then(async RecordsRequests => {
                        var [RecordRequest] = RecordsRequests.filter((iterator, index) => index == status)
                        await recordsRequests.findByIdAndDelete(RecordRequest._id)
                    })

                } catch (error) { console.error(error) }
            }

        } catch (error) { console.error(error) }
    }

}
module.exports = admController