
import Notification from './Notification'

const Home = ({ message }) => {
    return (
    <div>
        <Notification message={message}/>
        <h2>Blogs</h2>
        <p>Login to see, create and manage blogs</p>
    </div>
    )
}

export default Home