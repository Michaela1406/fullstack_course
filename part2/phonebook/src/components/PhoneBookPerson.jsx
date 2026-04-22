const PhoneBookPerson = ({ name, number, deleteThisPerson }) => {

    //console.log(name)
    return (
      (
        <li>
          <p>{name} {number}</p>
          <button onClick={deleteThisPerson}>{"delete"}</button>
        </li>
      )
    )
  }

export default PhoneBookPerson
