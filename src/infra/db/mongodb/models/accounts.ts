import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const accountsSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    index: true,
    lowercase: true,
    unique: true,
    required: true
  },

  password: {
    required: true,
    type: String
  },

  cpf: {
    required: true,
    type: String
  },

  address: {
    cep: {
      required: true,
      type: String
    },
    street: {
      required: true,
      type: String
    },
    number: {
      required: true,
      type: String
    },
    city: {
      required: true,
      type: String
    },
    state: {
      required: true,
      type: String
    }
  },

  accessToken: {
    type: String
  }
}, { timestamps: true })
accountsSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('accounts', accountsSchema)
