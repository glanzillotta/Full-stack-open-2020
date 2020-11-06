const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(res => {
    console.log("connected to MongoDB")
  })
  .catch(err => {
    console.log(`error connecting to MongoDB: ${err}`)
  });

const personSchema = new mongoose.Schema({
  name: {type:String,required:true, unique:true},
  number: {type:String, required:true},
});

personSchema.set('toJSON',{
  transform:(doc, returnObject)=>{
    returnObject.id=returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  }
}).plugin(uniqueValidator);

module.exports=mongoose.model('Person',personSchema)