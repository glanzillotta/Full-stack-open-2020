import mongoose from 'mongoose'
const { Schema, model } = mongoose

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  favoriteGenre: {
    type: String,
    required: true,
  }
})

export default model('User', schema)