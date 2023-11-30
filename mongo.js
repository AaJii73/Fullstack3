const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.3eexcxu.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})
  
const Person = mongoose.model('Person', personSchema)


if (process.argv.length == 3) {
    Person
    .find({})
    .then(people=> {
        console.log(
            people
            .map(x=> `\n${x.name} ${x.number}`)
            .reduce((total, person) => total + person, "phonebook:")
        )
    })
} else if (process.argv.length == 5)
{   
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
      
    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}