import { useState, useEffect, useRef} from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch
} from 'react-router-dom'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Home from './components/Home'
import Login from './components/Login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null) // Exercise 5.4 Blog List Frontend, step 4
  
  const blogFormRef = useRef() // Exercise 5.5 Blog List Frontend, step 5

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (loginObject) => {
    console.log('logging in with', loginObject.username, loginObject.password)
    try {
      const user = await loginService.login(loginObject)
      // Exercise 5.2 Blog List Frontend, step 2
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      //console.log('user', user)
      blogService.setToken(user.token)
      setUser(user)
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


  /*const blogList = (user) => (
    <div className='blogList'>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog => // Exercise 5.10 Blog List Frontend, step 10
        <Blog key={blog.id} blog={blog} updateLikes={addLike} deletedBlog={removeBlog} user={user}/>
      )}
    </div>
  )*/

  // Exercise 5.5 Blog List Frontend, step 5
  
  /*
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
  */

  // Exercise 5.24 Router blogs, step1
  const padding = {
    padding: 5
  }

  return (
    <div>
        <Link style={padding} to='/'>blogs</Link>
        {user === null && 
          <Link style={padding} to='/login'>login</Link>
        }
        {user !== null &&
          <Link style={padding} to='/createBlog'>create blog</Link>
        }
        {user !== null &&
          <button onClick={handleLogout}>logout</button>
        }
      <Routes>
        {user === null && 
          <Route path='/login' element={
            <Login 
              loginHandling={handleLogin} 
              message={message}
            />
          }/>
        }
        <Route path='/createBlog' element={
          <BlogForm createBlog={addBlog}/>
        }/>
        <Route path='/' element={
          <BlogList
            user={user}
            blogs={blogs}
            message={message}
          />
        }/>
        <Route path='/blogs/:id' element={
          <Blog
            blog={blog}
            updateLikes={addLike}
            deletedBlog={removeBlog}
            user={user}
          />
        }/>
      </Routes>
    </div>
  )
}

/*{user === null && <Route path='/' element={<Home message={message}/>}/>} */

export default App