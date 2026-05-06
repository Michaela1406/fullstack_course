// Exercise 3.12 Phonebook backend step 12

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as argument')
  process.exit(1)
} else if (process.argv.length == 4) {
    console.log('Give both name and number as arguments to add a new person to the phonebook')
    process.exit(1)
} else if (process.argv.length > 5) {
    console.log('Too many arguments. Give only password, name and number as arguments')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://phonebook_db_user:${password}@cluster0.vrvoxc7.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String, 
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {

const person = new Person({
    name: process.argv[3], 
    number: process.argv[4]
})

person.save().then(result => {
  console.log('Added ', person.name,' number ',person.number,' to phonebook')
  mongoose.connection.close()
})

} else if (process.argv.length === 3) {

Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })

} else {
    console.log('Invalid number of arguments. Give either only password to show all entries in the phonebook or give password, name and number to add a new entry to the phonebook')
    mongoose.connection.close()
}