const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please insert password");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.cdmdo.azure.mongodb.net/persons?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  console.log("phonebook: ");
  Person.find({}).then((res) => {
    res.forEach((person) => console.log(`${person.name} ${person.number}`));
    mongoose.disconnect();
  });
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((res) => {
    console.log(`Added ${person.name} ${person.number} to phonebook`);
    mongoose.disconnect();
  });
} else if (process.argv.length === 4)
  console.log("Please insert the number of the person");
