const
    mongoose = require(`mongoose`),
    mongoosePaginate = require(`mongoose-paginate`),
    Schema = mongoose.Schema,


    categoriesSchema = new Schema({

        name: {
            type: String
        },

        code: {
            type: String
        },

        type: {
            type: String
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
categoriesSchema.plugin(mongoosePaginate)
module.exports = mongoose.model(`categories`, categoriesSchema)