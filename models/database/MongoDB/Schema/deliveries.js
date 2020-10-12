const
    mongoose = require(`mongoose`),
    mongoosePaginate = require(`mongoose-paginate`),
    Schema = mongoose.Schema,


    deliveriesSchema = new Schema({

        status: [{
            type: Number
        }],

        trackingCode: {
            type: String
        },

        type: {
            type: String
        },

        value: {
            type: Number
        },

        deadline: {
            type: Number
        },

        address: {
            street: {
                type: String
            },
            number: {
                type: String
            },
            district: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            cep: {
                type: String
            }
        },

        payload: {
            type: Object
        },

        requests: {
            type: Schema.Types.ObjectId,
            ref: `requests`
        },

        whatsapp: {
            type: Boolean,
            default: false
        }

    }, { timestamps: true })
deliveriesSchema.plugin(mongoosePaginate)
module.exports = mongoose.model(`deliveries`, deliveriesSchema)