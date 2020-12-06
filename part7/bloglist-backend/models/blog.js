import mongoose from 'mongoose'
const { Schema, model } = mongoose

const blogSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [String]
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default model('Blog', blogSchema)
