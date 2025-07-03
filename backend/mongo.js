const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const phoneName = process.argv[3]
const phoneNumber = process.argv[4]


const url = `mongodb+srv://sfk:${password}@cluster0.kyent.mongodb.net/PhonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const phonebook = new Person({
  name: phoneName,
  number: phoneNumber
})

if (process.argv.length === 3) {
  console.log('phonebook: ')
  Person.find({}).then((result) => {
    result.forEach(element => {
      console.log(element.name, element.number)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  phonebook.save().then(() => {
    console.log(`added ${phoneName} number ${phoneNumber} to phonebook`)
    mongoose.connection.close()
  })
}


