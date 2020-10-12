const
    mongoose = require(`mongoose`),
    Schema = mongoose.Schema,
    mongoosePaginate = require(`mongoose-paginate`),


    productsSchema = new Schema({

        reference: {
            type: String
        },

        type: {
            type: String
        },

        collections: [
            {
                type: String
            }
        ],

        title: {
            type: String
        },

        description: {
            type: String
        },

        availability: {
            type: Boolean,
            default: true
        },

        tags: [
            {
                type: String,
            }
        ],

        categories: {
            type: Schema.Types.ObjectId,
            ref: `categories`
        },

        variations: [
            {
                type: Schema.Types.ObjectId,
                ref: `variations`
            }
        ],

        assessments: [
            {
                type: Schema.Types.ObjectId,
                ref: `assessments`
            }
        ],

    }, { timestamps: true })
productsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model(`products`, productsSchema)