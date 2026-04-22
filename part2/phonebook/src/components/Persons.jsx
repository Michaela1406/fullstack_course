import PhoneBookPerson from './PhoneBookPerson'

const Persons = ({namesToShow, deleteAPerson}) => {
  return (
    <ul>
       {namesToShow.map(person =>
          <PhoneBookPerson key={person.name} name={person.name} number={person.number} deleteThisPerson={() => deleteAPerson(person.id)} />
        )}
    </ul>
  )
}

export default Persons