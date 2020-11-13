import mongoose from 'mongoose'
const { Schema } = mongoose

const schema = new Schema({
  personal: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    passwordConfirmation: {
      type: String,
      required: true
    }
  },
  address: {
    cep: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    neighborhood: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    }
  },
  enabled: {
    type: Boolean,
    required: true,
    default: false
  },
  accessToken: {
    type: String,
    required: false
  }
}, {
  timestamps: true
})

export default mongoose.model('accounts', schema)
