import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import phonebook from './Services/phonebook'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [search, setSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)


  useEffect(() => {
    phonebook.getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const handleDeleteClick = (id) => {
    const name = persons.find(p => p.id == id).name
    if (confirm(`Delete ${name} ?`)) {
      phonebook.deleteAt(id)
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notificationMessage} />
      <Filter search={search} setSearch={setSearch} />
      <h3>Add a new</h3>
      <PersonForm persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setNotificationMessage={setNotificationMessage}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDeleteClick={handleDeleteClick} search={search} />
    </div>
  )
}

export default App