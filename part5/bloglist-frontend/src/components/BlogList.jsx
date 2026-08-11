// Exercise 5.24 Router blogs, step1
import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const BlogList = ({blogs}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null) // Exercise 5.4 Blog List Frontend, step 4
  const blogFormRef = useRef() // Exercise 5.5 Blog List Frontend, step 5

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

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogList = (user) => (
    <div className='blogList'>
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
        <h2>Log in to application</h2>
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
      <div>
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
      </div>
      {blogList(user)}
    </div>
  )
}