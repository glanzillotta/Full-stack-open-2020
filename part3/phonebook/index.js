require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person=require("./mongo");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("post", (req) => {
  if (req.body.name && req.body.number) return JSON.stringify(req.body);
  return null;
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :post")
);

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
};

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people)=>{
    res.json(people);
  })
});

const numPersons=()=>{
let numPersons=0;

Person.countDocument({}, (err,count)=> {
  numPersons+= count;
})
return numPersons;
}
app.get("/info", (req, res) => {
  Person.countDocuments({}, (err,count)=> {
    res.send(
      `<p>Phonebook has ${count} info for people</p><p>${Date()}</p>`
    );
  })
  
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id).then((person)=>{
if(person) res.json(person);
    else res.status(404).end();
  }).catch(error=> next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error=>next(error));
});

app.post("/api/persons", (req, res) => {
  const body=req.body;

  if(!body.name || !body.number)
    return res.status(400).json({ 
      error: "name or number missing"
    })

  const person=new Person({ 
    name:body.name,
    number:body.number,
  });

  person.save().then(savedPerson =>{
    res.json(savedPerson.toJSON());
  });
});

app.put("/api/persons/:id", (req, res, next) => {
const body =req.body;

const person ={ name:body.name, number:body.number};

Person.findByIdAndUpdate(req.params.id, person, {new:true})
  .then(updatedPerson => res.json(updatedPerson))
  .catch(error=> next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});