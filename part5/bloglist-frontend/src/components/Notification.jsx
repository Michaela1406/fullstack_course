const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if (message.includes('Added') || message.includes('Logged in')) {
        return (
        <div className="success">
            {message}
        </div>
        )
    }
    if (message.includes('Wrong') || message.includes('Error')) {
        return (
        <div className="unsuccess">
            {message}
        </div>
        )
    }
  }
  
  export default Notification