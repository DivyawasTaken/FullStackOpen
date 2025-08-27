import Personlist from './components/Personlist'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState({})


  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    
  console.log(persons)
    event.preventDefault()

    const elementFound = persons.find((element) => element.name == newName)
    if (elementFound !== undefined) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, Do you want update information?`)
      if (confirmUpdate) {
        const personModify = {...elementFound, number: newNumber}
        personService.update(elementFound.id, personModify)
        // Notification message
        setMessage(`Changed number of ${elementFound.name}`)
        setNotificationStyle({color: 'green'})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
    else {
      const newid = persons.length + 1;
      const personObject = {
        name: newName,
        number: newNumber,
        id: String(newid),
      }
      personService.create(personObject).then(() => {
        setNewName('')
        setNewNumber('')
        // Notification message
        setMessage(`Added ${personObject.name}`)
        setNotificationStyle({color: 'green'})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
    
  }
  const clickDelete = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService.deleteperson(person.id)
        .then(() => {
          // Notification message
          setMessage(`Deleted ${person.name}`)
          setNotificationStyle({color: 'red'})
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(() => {
          setMessage(`Information of '${person.name}' was already removed from server`)
          setNotificationStyle({color: 'red'})
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification styles={notificationStyle} message={message}/>
      <div>debug: {newName}</div>

      <PersonForm submitForm={addPerson} nameValue={newName} nameHandle={handleNameChange} numberValue={newNumber} numberHandle={handleNumberChange} />
      <h2>Numbers</h2>
      <Personlist personArr={persons} deleteHandle={clickDelete} />
    </div>
  )
}

export default App