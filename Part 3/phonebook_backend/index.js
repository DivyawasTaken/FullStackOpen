const express = require('express')
const app = express()
require('dotenv').config()
const Person = require('./models/person')
// var morgan = require('morgan')

app.use(express.json())
app.use(express.static('dist'))

// morgan.token('post', function (tokens, req, res) { 
//     if (tokens.method(req,res) === 'POST') {
//       return JSON.stringify(req.body)
//     } 
//     })
//     morgan.token('custom', function (tokens, req, res) {
//         return [
//           tokens.method(req, res),
//           tokens.url(req, res),
//           tokens.status(req, res),
//           tokens.res(req, res, 'content-length'), 
//           '-',
//           tokens['response-time'](req, res), 
//           'ms',
//           tokens.post(tokens, req, res),
//         ].join(' ')
//       })
//       app.use(morgan('custom'))


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
    console.log("test test")
  
  app.get(('/api/persons'), (request, response, next) => {
    Person.find({}).then(result => {
      response.json(result)
    }).catch(error => next(error))
  })

  const getDateTime = () => {
    var currentdate = new Date()
    const day = currentdate.toLocaleDateString('en-HK', { weekday: 'long' })
    const month = currentdate.toLocaleDateString('en-HK', { month: 'long' })
    const dayOfMonth = currentdate.getDate()
    const year = currentdate.getFullYear()
    const timeOptions = { 
      hour: '2-digit',
      minute: '2-digit', 
      second: '2-digit', 
      timeZoneName: 'short' 
    }
    const timeWithTimeZone = currentdate.toLocaleTimeString('en-HK', timeOptions)                   
    return `${day} ${month} ${dayOfMonth} ${year}, ${timeWithTimeZone}`
  }
  
  // Get info 
  app.get(('/info'), (request, response, next) => {
    const date = getDateTime()
    const msg = `<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`
    response.send(msg)
    
  })

  app.get(('/api/persons/:id'), (request, response, next) => {
    Person.findById(request.params.id).then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  })

  app.delete(('/api/persons/:id'), (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(() => {
      response.status(204).end()
    }).catch(error => next(error))
  })

  
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  
  app.post('/api/persons', (request, response) => {
    
    console.log(request.body)
    const body = request.body
    
    if (!body.number || !body.name) {
      console.log("test 2")
        response.statusCode = 400
        response.json({ error: 'The name or number is missing' })
        
    } 
    if (persons.find(el => el.name === body.name)) {
        console.log("test 1")
        response.statusCode = 400
        response.json({ error: 'name must be unique' })
    }

    const person = new Person({
      // id: generateId(),
      name: body.name,
      number: body.number,
    })
    
    person.save().then(savedPerson => {
      response.statusCode = 201
      response.json(savedPerson)
    }).catch(error => next(error))
  })

  app.put(('/api/persons/:id'), (request, response, next) => {
    const {name, number} = request.body
  
  
    Person.findByIdAndUpdate(request.params.id, 
      { name, number}, 
      { new: true, runValidators: true, context: 'query' }
      )
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  app.use(unknownEndpoint)

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

