import mongoose from 'mongoose'
const { Schema } = mongoose

const schema = new Schema({
  answers: [{
    image: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
})

export default mongoose.model('surveys', schema)
