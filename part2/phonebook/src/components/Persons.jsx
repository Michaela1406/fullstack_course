import PhoneBookPerson from './PhoneBookPerson'

const Persons = (props) => {
  return (
    <ul>
       {props.namesToShow.map(person =>
          <PhoneBookPerson key={person.name} name={person.name} number={person.number} />
        )}
    </ul>
  )
}

export default Persons