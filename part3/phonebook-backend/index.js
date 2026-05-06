require('dotenv').config()
const express = require('express')
// Exercise 2.13 Phonebook database step 1
const Person = require('./models/person')
const app = express()

let persons = []
// Exercise 3.7 Phonebook backend step 7
const morgan = require('morgan')


// Exercise 3.8 Phonebook backend step 8

morgan.token("body", (req) => {
  return req.body ? JSON.stringify(req.body) : "-";
});

app.use(morgan(':method :url :status - :response-time ms :body'))

// Exercise 3.9 Phonebook backend step 9
//const cors = require('cors')
//app.use(cors())

// Exercise 3.11 Phonebook backend step 11
app.use(express.json())
app.use(express.static('dist'))


/*let persons = [
    { 
        id: "1",
        name: "Arto Hellas", 
        number: "040-123456"
      },
      { 
        id: "2",
        name: "Ada Lovelace", 
        number: "39-44-5323523"
      },
      { 
        id: "3",
        name: "Dan Abramov", 
        number: "12-43-234345"
      },
      { 
        id: "4",
        name: "Mary Poppendieck", 
        number: "39-23-6423122"
      }
]*/


// Exercise 3.1 Phonebook backend step 1
/*app.get('/api/persons', (request, response) => {
  response.json(persons)
})
*/

// Exercise 2.13 Phonebook database step 1
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

// Exercise 3.2 Phonebook backend step 2
/*app.get('/info', (request, response) => {
  const date = new Date()
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
     <p>${date}</p>`
  )
})*/

// Exercise 3.3 Phonebook backend step 3
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Exercise 3.4 Phonebook backend step 4

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    person = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  // Exercise 3.5 Phonebook backend step 5

  /*const generateId = () => {
    const id = Math.floor(Math.random() * 1000000)
    return String(id)
  }
  */
  
  // Exercise 2.14 Phonebook database step 2
  app.post('/api/persons', (request, response) => {
    const body = request.body

    // Exercise 3.6 Phonebook backend step 6
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number is missing' 
      })
    }

    if (persons.find(person => person.name === body.name)) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
  
    const person = new Person ({
      name: body.name,
      number: body.number,
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})