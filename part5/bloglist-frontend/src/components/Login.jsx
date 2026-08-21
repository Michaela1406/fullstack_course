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

const Login = ({ loginHandling }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate() // Exercise 5.24 Router blogs, step1
  
  // Exercise 5.1 Blog List Frontend, step 1
  const handleLogin = event => {
    event.preventDefault()
    loginHandling({ username: username, password: password })
    navigate('/') // Exercise 5.24 Router blogs, step1
    setUsername('')
    setPassword('')
  }


    return (
        <div>
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

