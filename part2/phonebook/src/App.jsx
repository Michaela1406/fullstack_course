/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/


// Exercise 2.6
/*
import { useState } from 'react'

const PhoneBookPeople = ({ name }) => {
  //console.log(name)
  return (
  <p>{name}</p>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [showNames, setShowNames] = useState(true)

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName
    }
    // Exercise 2.7
    //console.log('persons:', persons)
    const foundInPhoneBook = persons.find(person => person.name === newName)
    if (foundInPhoneBook) {
      alert(`${newName} is already added to phonebook`)
    }
    if (!foundInPhoneBook) {
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    //setShowNames(true)
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const namesToShow = showNames ? persons : persons.filter(person => person.name)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {namesToShow.map(person =>
          <PhoneBookPeople key={person.name} name={person.name} />
        )}
      </ul>
    </div>
  )
}

export default App
*/

// Exercise 2.8
/*
import { useState } from 'react'

const PhoneBookPeople = ({ name, number }) => {
  //console.log(name)
  return (
  <p>{name} {number}</p>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showNames, setShowNames] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }
    // Exercise 2.7
    //console.log('persons:', persons)
    const foundInPhoneBook = persons.find(person => person.name === newName)
    if (foundInPhoneBook) {
      alert(`${newName} is already added to phonebook`)
    }
    if (!foundInPhoneBook) {
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
    setShowNames(true)
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const namesToShow = showNames ? persons : persons.filter(person => person.name)
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <ul>
        {namesToShow.map(person =>
          <PhoneBookPeople key={person.name} name={person.name} number={person.number} />
        )}
      </ul>
    </div>
  )
}

export default App
*/

// Exercise 2.9

/*import { useState } from 'react'

const PhoneBookPeople = ({ name, number }) => {
  //console.log(name)
  return (
  <p>{name} {number}</p>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showNames, setShowNames] = useState('')
  const [searchName, setSearchName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }
    //console.log('persons:', persons)
    const foundInPhoneBook = persons.find(person => person.name === newName)
    if (foundInPhoneBook) {
      alert(`${newName} is already added to phonebook`)
    }
    if (!foundInPhoneBook) {
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
    setShowNames(true)
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleSearchName = (event) => {
    setSearchName(event.target.value)
    //const filteredNames = persons.filter(person => 
      //person.name.toLowerCase().startsWith(searchName.toLowerCase())
    //)
   //console.log('filtered names:', filteredNames)
    setShowNames(false) // this does not work as intended!!!
  }

  const namesToShow = showNames ? persons : persons.filter(person => person.name.toLowerCase().startsWith(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={searchName} onChange={handleSearchName} />
      </div>
      <h3>Add a new name</h3>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <ul>
        {namesToShow.map(person =>
          <PhoneBookPeople key={person.name} name={person.name} number={person.number} />
        )}
      </ul>
    </div>
  )
}

export default App
*/

// Exercise 2.10

/*
import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PhoneBookPerson from './components/PhoneBookPerson'

const Filter = (props) => {
  //console.log(props.searchName)
  return(
  <div>
    filter shown with: <input value={props.searchName} onChange={props.handleSearchName} />
  </div>
  )
}


const PersonForm = (props) => {
  //console.log(props.newName)
  //console.log(props.newNumber)
  //console.log(props.addName)
  return(
    <form onSubmit={props.addName}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const PhoneBookPerson = ({ name, number }) => {
  //console.log(name)
  return (
  <p>{name} {number}</p>
  )
}

const Persons = (props) => {
  return (
    <ul>
       {props.namesToShow.map(person =>
          <PhoneBookPerson key={person.name} name={person.name} number={person.number} />
        )}
    </ul>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showNames, setShowNames] = useState('')
  const [searchName, setSearchName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }
    //console.log('persons:', persons)
    const foundInPhoneBook = persons.find(person => person.name === newName)
    if (foundInPhoneBook) {
      alert(`${newName} is already added to phonebook`)
    }
    if (!foundInPhoneBook) {
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
    setShowNames(true)
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleSearchName = (event) => {
    setSearchName(event.target.value)
    //const filteredNames = persons.filter(person => 
      //person.name.toLowerCase().startsWith(searchName.toLowerCase())
    //)
   //console.log('filtered names:', filteredNames)
    setShowNames(false) // this does not work as intended!!!
  }

  const handleShowNames = (persons) => {
    showNames ? persons : persons.filter(person => person.name.toLowerCase().startsWith(searchName.toLowerCase()))
  }

  const namesToShow = showNames ? persons : persons.filter(person => person.name.toLowerCase().startsWith(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchName={handleSearchName} />
      <h3>Add a new name</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons namesToShow={namesToShow} />
    </div>
  )
}

export default App

*/

//  Exercise 2.11

/*
import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showNames, setShowNames] = useState('')
  const [searchName, setSearchName] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }
    console.log('persons:', persons)
    const foundInPhoneBook = persons.find(person => person.name === newName)
    if (foundInPhoneBook) {
      alert(`${newName} is already added to phonebook`)
    }
    if (!foundInPhoneBook) {
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
    setShowNames(true)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleSearchName = (event) => {
    setSearchName(event.target.value)
    setShowNames(false)
  }

  const namesToShow = showNames ? persons : persons.filter(person => person.name.toLowerCase().startsWith(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchName={handleSearchName} />
      <h3>Add a new name</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons namesToShow={namesToShow} />
    </div>
  )
}

export default App
*/

// Exercise 2.12 

/*
import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showNames, setShowNames] = useState('')
  const [searchName, setSearchName] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }
    console.log('persons:', persons)
    const foundInPhoneBook = persons.find(person => person.name === newName)
    if (foundInPhoneBook) {
      alert(`${newName} is already added to phonebook`)
    }
    if (!foundInPhoneBook) {
      axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response => {
        console.log('response', response)
        setPersons(persons.concat(response.data))
      })
    }
    setNewName('')
    setNewNumber('')
    setShowNames(true)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleSearchName = (event) => {
    setSearchName(event.target.value)
    setShowNames(false)
  }

  const namesToShow = showNames ? persons : persons.filter(person => person.name.toLowerCase().startsWith(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchName={handleSearchName} />
      <h3>Add a new name</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons namesToShow={namesToShow} />
    </div>
  )
}

export default App
*/

// Exercise 2.13

/*
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showNames, setShowNames] = useState('')
  const [searchName, setSearchName] = useState('')

  const hook = () => {
    console.log('effect')
    personServices
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }
  
  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }
    console.log('persons:', persons)
    const foundInPhoneBook = persons.find(person => person.name === newName)
    if (foundInPhoneBook) {
      alert(`${newName} is already added to phonebook`)
    }
    if (!foundInPhoneBook) {
      personServices
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewName('')
    setNewNumber('')
    setShowNames(true)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleSearchName = (event) => {
    setSearchName(event.target.value)
    setShowNames(false)
  }

  const namesToShow = showNames ? persons : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchName={handleSearchName} />
      <h3>Add a new name</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons namesToShow={namesToShow} />
    </div>
  )
}

export default App
*/

// Exrecise 2.14

import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showNames, setShowNames] = useState('')
  const [searchName, setSearchName] = useState('')

  const hook = () => {
    console.log('effect')
    personServices
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }
  
  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }
    console.log('persons:', persons)
    const foundInPhoneBook = persons.find(person => person.name === newName)
    if (foundInPhoneBook) {
      alert(`${newName} is already added to phonebook`)
    }
    if (!foundInPhoneBook) {
      personServices
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewName('')
    setNewNumber('')
    setShowNames(true)
  }

  const deleteAPerson = (id) => {
    const person = persons.find(n => n.id === id)
    console.log('delete person with id:', id)
    personServices
      .deletePerson(id)
      .then(returnedPerson => {
        console.log('response', returnedPerson)
        setPersons(persons.filter(n => n.id !== id))
        setShowNames(true)
      })
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleSearchName = (event) => {
    setSearchName(event.target.value)
    setShowNames(false)
  }

  const namesToShow = showNames ? persons : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchName={handleSearchName} />
      <h3>Add a new name</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons namesToShow={namesToShow} deleteAPerson={deleteAPerson}/>
    </div>
  )
}

export default App

