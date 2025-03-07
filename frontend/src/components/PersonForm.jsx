import phonebook from "../Services/phonebook"

const PersonForm = (props) => {
    const { persons,
        setPersons,
        newName,
        setNewName,
        newNumber,
        setNewNumber,
        setNotificationMessage
    } = props

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber,
        }

        const alreadyAddedPerson = persons.filter(item => item.name.toLowerCase() === newPerson.name.toLowerCase())
        if (alreadyAddedPerson.length > 0) {
            if (confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
                phonebook.update(alreadyAddedPerson[0].id, newPerson)
                    .then(person => {
                        setPersons(persons.map(p => p.id == alreadyAddedPerson[0].id ? person : p))
                    })
                    .catch(() => {
                        setNotificationMessage({
                            message: `Information of ${newPerson.name} has been removed from server.`,
                            warningType: 'error'
                        })
                        setTimeout(() => {
                            setNotificationMessage(null)
                        }, 5000);
                        alert("asdasd")
                    })
                setNotificationMessage({
                    message: `Number of ${newPerson.name} is changed.`,
                    warningType: 'added'
                })
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 5000);
            }
        } else {
            phonebook.create(newPerson)
                .then(person => {
                    setPersons([...persons, person])
                })
            setNotificationMessage({
                message: `Added ${newPerson.name}`,
                warningType: 'added'
            })
            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000);
        }
        setNewName('')
        setNewNumber(0)
    }

    const handleNameInputChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberInputChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <div>
                    name: <input value={newName} onChange={handleNameInputChange} />
                </div>
                <div>
                    number:  <input value={newNumber} onChange={handleNumberInputChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

        </div>
    )
}

export default PersonForm