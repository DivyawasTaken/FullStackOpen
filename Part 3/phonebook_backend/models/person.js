const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const password = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

console.log('connecting to this url: ', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected')
  })
  .catch(error => {
    console.log('error connecting: ', error.message)
  })

  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 3,
      required: true
    },
    number: {
      type: String,
      validate: { validator: 
        function(content) {
          return /\d{2,3}-\d{6}/.test(content)
        },
        message: props => "${props.value} isn't a valid number"
      },
      minLength: 8,
      required: true
    },
  })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)