const Filter = (props) => {
    const { search, setSearch } = props

    const handlSearchChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div>
            filter shown with<input value={search} onChange={handlSearchChange} />
        </div>
    )
}

export default Filter