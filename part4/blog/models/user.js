import mongoose from 'mongoose'
const { Schema, model } = mongoose
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, minLength:3 },
  name: String,
  passwordHash: { type:String, required:true },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

export default model('User', userSchema)
