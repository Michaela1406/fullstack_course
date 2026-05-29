import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null) // Exercise 5.4 Blog List Frontend, step 4

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // Exercise 5.2 Blog List Frontend, step 2
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Exercise 5.1 Blog List Frontend, step 1
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({username, password})
      // Exercise 5.2 Blog List Frontend, step 2
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`Logged in ${user.username}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch {
      setMessage(`Wrong username or password`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  // Exercise 5.2 Blog List Frontend, step 2
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedNoteappUser')
  }

  // Exercise 5.3 Blog List Frontend, step 3
  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response.data))
      setMessage(`Added ${response.data.title} by ${response.data.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch {
      console.log('error creating a new blog')
      setMessage('Error creating a new blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.username} logged in</p>
      <div>
        <button onClick={handleLogout}>
          logout
        </button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  if (user === null) {
      return (
        <div>
          <Notification message={message}/>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      )
  }
  return (
    <div>
    <Notification message={message}/>
    <BlogForm createBlog={addBlog}/>
    {blogList()}
    </div>
  )
}

export default App