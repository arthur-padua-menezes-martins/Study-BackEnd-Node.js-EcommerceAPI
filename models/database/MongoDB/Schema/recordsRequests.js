const
    mongoose = require(`mongoose`),
    Schema = mongoose.Schema,


    recordsRequestsSchema = new Schema({

        type: {
            type: String
        },

        situation: {
            type: Object
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
module.exports = mongoose.model(`records_requests`, recordsRequestsSchema)