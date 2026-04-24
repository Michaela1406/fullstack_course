const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if (message.includes('Added') || message.includes('Changed number for')) {
        return (
        <div className="additionSuccess">
            {message}
        </div>
        )
    }
    if (message.includes('already been removed')){
        return (
        <div className="deletionUnsuccess">
            {message}
        </div>
        )
    }
  }
  
  export default Notification