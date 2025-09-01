const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const user = process.argv[3]
const phonenumber = process.argv[4]

const url = `mongodb+srv://${user}:${password}@cluster0.5mcouos.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Note', noteSchema)
if (user) {
  const person = new Person({
    name: user,
  number: phonenumber,
  })
  
  Person.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
}
else {
  Note.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
