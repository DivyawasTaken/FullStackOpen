const express = require('express')
const app = express()
var morgan = require('morgan')

app.use(express.json())

morgan.token('post', function (tokens, req, res) { 
    if (tokens.method(req,res) === 'POST') {
      return JSON.stringify(req.body)
    } 
    })
    morgan.token('custom', function (tokens, req, res) {
        return [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'), 
          '-',
          tokens['response-time'](req, res), 
          'ms',
          tokens.post(tokens, req, res),
        ].join(' ')
      })
      app.use(morgan('custom'))
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

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
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

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    if (!body.number || !body.name) {
        response.statusCode = 400
        response.json({ error: 'The name or number is missing' })
    } 
    if (persons.find(el => el.name === body.name)) {
        response.statusCode = 400
        response.json({ error: 'name must be unique' })
    }
  
    const person = {
      content: body.content,
      important: body.important || false,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
