const
    /*DATABASE MODULES*/
    categories = require(`../../models/database/MongoDB/Schema/categories.js`),
    products = require(`../../models/database/MongoDB/Schema/products.js`),
    variations = require(`../../models/database/MongoDB/Schema/variations.js`),

    /*HELPERS MODULES*/
    constructors = require(`../../helpers/function/constructors.js`),
    classExtensions = require(`../../helpers/classExtensions/index.js`)


class searchController {


    async searchRequests(request, response, next) {
        try {

            const { params } = request
            var query = { $or: [{ 'title': { $regex: new RegExp(params.categories, 'i') } }, { 'description': new RegExp(params.name, 'i') }] }, offset = Number(params.offset || 0), limit = Number(params.limit || 30), error = new Error()

            products.paginate(query, { offset, limit, populate: `categories` }).then((Products) => {
                if (Boolean(Products)) {
                    response.send(Products)
                }
            })

        } catch (error) { console.error(error) }
    }




    async searchReference(request, response, next) {
        try {

            const { params } = request
            var paginationQuery = { availability: true }

            if (params.reference) {

                products.findOne({
                    ...paginationQuery, reference: params.reference
                })
                    .populate({ path: 'variations' }).populate({ path: 'categories', select: 'name' })
                    .then(Product => (
                        response.send({ Product })
                    ))

            }

            if (!params.reference) {

            }

        } catch (error) { console.error(error) }
    }




    async searchProducts(request, response, next) {
        try {

            const { params, query } = request
            var paginationQuery = { availability: true }, options = {}, select, selectType, _id = [], names = new Set(), types = new Set(), collections = []

            if (params.category && params.type) {

                if (query.search) {

                    if (query.paginate) {

                    } else {

                    }

                } else {

                    selectType = params.type.split(',') ? params.type.split(',') : params.type

                    return products.find({

                        $or: [
                            ...selectType.map(type => ({ type: type }))
                        ],
                        collections: { $in: (query.collections).split(',') }

                    }, {}, await classExtensions.getOffsetAndLimit({ skip: query.offset, limit: query.limit }))

                        .select('reference categories variations')
                        .populate({ path: 'categories' }).populate({ path: 'variations' })
                        .then(Products => (

                            response.send({
                                Products: Products.filter(
                                    Product => Product.categories.name === params.category
                                )
                            })

                        ))

                }

            }

            if (params.category) {

                if (query.search) {

                    if (query.paginate) {

                    } else {

                    }

                }

                if (query.paginate) {

                    if (query.sort) {
                        options = { ...options, ...(await classExtensions.getSort(query.sort)) }
                    }

                    if (query.offset || query.limit) {
                        options = { ...options, ...(await classExtensions.getOffsetAndLimit({ offset: query.offset, limit: query.limit })) }
                    }

                    await products.paginate(

                        { ...paginationQuery, categories: params.category },
                        { ...options, populate: ['variations'] }

                    ).then(Products => (
                        response.send({ ProductsPagination: Products })
                    ))

                }

                if (params.category === '*') {

                    if (query.select) {

                        select = query.select.split(',')

                        return categories.find({

                            $or: [
                                ...select.map(name => ({ name: name }))
                            ]

                        })
                            .select('name products')
                            .populate({ path: 'products', select: ['type', 'collections'] })
                            .then(Categories => {

                                Categories.forEach(Category => {
                                    _id.push(Category._id)
                                    names.add(Category.name)
                                })

                                Categories.forEach(Category => (Category.products).forEach(
                                    Products => {
                                        Products.type !== null && types.add(Products.type)
                                        Products.collections !== null && collections.push(...Products.collections)
                                    }
                                ))

                                return response.send({ subHeaders: Categories, _id, names: [...names], types: [...types], collections })

                            })

                    }

                }

            }

        } catch (error) { console.error(error) }
    }




    async searchTerm(request, response, next) {
        try {

            const { params, query } = request, { searchTerm } = params, searchTermIn = (searchTerm.split(' ')).filter(term => term !== '')
            var options = {}

            if (query.sort) {
                options = { ...options, ...(await classExtensions.getSort(query.sort)) }
            }

            if (query.offset || query.limit) {
                options = { ...options, ...(await classExtensions.getOffsetAndLimit({ offset: query.offset, limit: query.limit })) }
            }

            if (params.searchTerm) {

                return products.paginate(

                    {
                        $or: [
                            ...searchTermIn.map(term => ({ type: { $regex: term, $options: "i" } })),
                            ...searchTermIn.map(term => ({ title: { $regex: term, $options: "i" } })),
                            ...searchTermIn.map(term => ({ description: { $regex: term, $options: "i" } })),
                            ...searchTermIn.map(term => ({ tags: { $regex: term, $options: "i" } }))
                        ]
                    },
                    {
                        ...options,
                        populate: ['categories', 'variations']
                    }

                ).then(Products => (
                    Products.total !== 0 ?
                        response.send({ researchProducts: Products }) :
                        response.send(undefined)
                ))

            } else {
                return response.send(undefined)
            }

        } catch (error) { console.error(error) }
    }

}
module.exports = searchController