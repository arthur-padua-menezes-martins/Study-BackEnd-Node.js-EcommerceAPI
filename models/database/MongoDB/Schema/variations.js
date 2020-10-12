const
    mongoose = require(`mongoose`),
    mongoosePaginate = require(`mongoose-paginate`),
    Schema = mongoose.Schema,


    variationsSchema = new Schema({

        code: {
            type: String
        },

        name: {
            type: String
        },

        title: {
            type: String
        },

        value: {
            type: Number
        },

        defaultValue: {
            type: Number
        },

        images:
        {
            type: Array,
            default: []
        },

        ticket: {
            type: Array,
            default: []
        },

        quantityInStock: {
            type: Number
        },

        quantityInTransaction: {
            type: Number
        },

        deliveries: {
            dimensions: {
                width: {
                    type: Number
                },
                height: {
                    type: Number
                },
                length: {
                    type: Number
                }
            },
            weight: {
                type: Number
            },
            freeShipping: {
                type: Boolean,
                default: false
            }
        },

        availability: {
            type: Boolean,
            default: true
        },

        products: [
            {
                type: Schema.Types.ObjectId,
                ref: `products`
            }
        ],

    }, { timestamps: true })
variationsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model(`variations`, variationsSchema)