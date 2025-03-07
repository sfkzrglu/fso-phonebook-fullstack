
const Persons = (props) => {
    const { persons, handleDeleteClick, search } = props

    return persons.map(item => {
        if (item.name.toLowerCase().includes(search.toLowerCase())) {
            return (
                <div key={item.id}>
                    {item.name} {item.number}
                    <button onClick={() => handleDeleteClick(item.id)}>delete</button>
                </div>
            )
        }
    })
}

export default Persons