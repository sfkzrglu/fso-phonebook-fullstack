import axios from "axios";

const url = "/api/persons"

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = (person) => {
    const request = axios.post(url, person)
    return request.then(response => response.data)
}

const deleteAt = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
}

const update = (id, updatedPerson) => {
    const request = axios.put(`${url}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

export default { getAll, create, deleteAt, update }