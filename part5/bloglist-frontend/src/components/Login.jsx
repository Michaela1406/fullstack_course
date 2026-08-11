import { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate
} from 'react-router-dom'

import LoginForm from './LoginForm'
import Togglable from './Togglable'
import Notification from './Notification'

import blogService from '../services/blogs'
import loginService from '../services/login'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null) // Exercise 5.4 Blog List Frontend, step 4
  
  const blogFormRef = useRef() // Exercise 5.5 Blog List Frontend, step 5
  const navigate = useNavigate() // Exercise 5.24 Router blogs, step1

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
        navigate('/') // Exercise 5.24 Router blogs, step1
      } catch {
        setMessage('Wrong username or password')
       
      }
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }


    return (
        <div>
        <Notification message={message}/>
        <h2>Log in to application</h2>
        <Togglable buttonLabel='login'>
            <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
            />
        </Togglable>
        </div>
    )
}

export default Login

