const Filter = (props) => {
    //console.log(props.searchName)
    return(
    <div>
      filter shown with: <input value={props.searchName} onChange={props.handleSearchName} />
    </div>
    )
  }

export default Filter