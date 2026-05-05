import axios from 'axios'
// Exercise 3.9 Phonebook backend step 9
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deletePerson = person => {
  const request = axios.delete(`${baseUrl}/${person.id}`)
  return request.then(response => response.data)
}

const updateNumber = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, deletePerson, updateNumber}