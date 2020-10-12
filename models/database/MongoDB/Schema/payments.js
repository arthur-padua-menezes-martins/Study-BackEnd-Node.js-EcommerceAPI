const
    mongoose = require(`mongoose`),
    mongoosePaginate = require(`mongoose-paginate`),
    Schema = mongoose.Schema,


    paymentsSchema = new Schema({

        status: [{
            type: Number
        }],

        paymentMethod: {
            type: String
        },

        value: {
            type: Number
        },

        installment: {
            type: Number,
            default: 1
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

        card: {
            name: {
                type: String
            },
            cpf: {
                type: String
            },
            areaCode: {
                type: String
            },
            phone: {
                type: String
            },
            dateOfBirth: {
                type: String
            },
            token: {
                type: String
            }
        },

        deliveryAddressBillingAddress: {
            type: Boolean,
            default: true
        },

        pagSeguroCode: {
            type: String
        },

        payload: {
            type: Array
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
paymentsSchema.plugin(mongoosePaginate)




module.exports = mongoose.model(`payments`, paymentsSchema)