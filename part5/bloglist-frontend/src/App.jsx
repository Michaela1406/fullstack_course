import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null) // Exercise 5.4 Blog List Frontend, step 4
  const blogFormRef = useRef() // Exercise 5.5 Blog List Frontend, step 5

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
      const user = await loginService.login({ username, password })
      // Exercise 5.2 Blog List Frontend, step 2
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`${user.username} logged in`)
    } catch {
      setMessage('Wrong username or password')
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  // Exercise 5.2 Blog List Frontend, step 2
  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  // Exercise 5.3 Blog List Frontend, step 3
  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response.data))
      setMessage(`Added ${response.data.title} by ${response.data.author}`)
    } catch {
      console.log('error creating a new blog')
      setMessage('Error creating a new blog')
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  // Exercise 5.8 Blog List Frontend, step 8
  const addLike = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, {
        ...blogObject,
      })
      setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : updatedBlog))
    } catch {
      console.log('error updating the blog')
      setMessage('Error updating the blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  // Exercise 5.11 Blog List Frontend, step 11
  const removeBlog = async (blogObject) => {
    const blogToDelete = blogs.find(blog => blog.id === blogObject.id)
    try {
      await blogService.remove(blogToDelete.id)
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      setMessage(`Deleted ${blogToDelete.title} by ${blogToDelete.author}`)
    } catch {
      console.log('error deleting the blog')
      setMessage('Error deleting the blog')
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const blogList = (user) => (
    <div>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog => // Exercise 5.10 Blog List Frontend, step 10
        <Blog key={blog.id} blog={blog} updateLikes={addLike} deletedBlog={removeBlog} user={user}/>
      )}
    </div>
  )

  // Exercise 5.5 Blog List Frontend, step 5

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <Notification message={message}/>
        <h1>Bloglist</h1>
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <Notification message={message}/>
      <h2>Blogs</h2>
      <div>
        <p>{user.username} logged in <button onClick={handleLogout}>
          logout
        </button></p>
      </div>
      {blogForm()}
      {blogList(user)}
    </div>
  )
}

export default App