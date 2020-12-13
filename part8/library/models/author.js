import mongoose from 'mongoose'
const { Schema, model } = mongoose

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
  bookCount: {
    type: Number,
    default: 0
  }
})

export default model('Author', schema)