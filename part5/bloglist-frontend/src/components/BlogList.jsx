// Exercise 5.24 Router blogs, step1
import { useState, useEffect, useRef, useNavigate } from 'react'
import { Link } from 'react-router-dom'

import blogService from '../services/blogs'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Notification from './Notification'

const BlogList = ({user, blogs, message}) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  }, [])


  const blogList = (user) => (
    <div className='blogList'>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog => // Exercise 5.10 Blog List Frontend, step 10
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </li>
      )}
    </div>
  )

  if (user === null) {
    return (
      <div>
        <Notification message={message}/>
        <h2>Blogs</h2>
        {blogList(user)}
      </div>
    )
  }
  return (
    <div>
      <Notification message={message}/>
      <h2>Blogs</h2>
        <div>
          <p>{user.username} logged in</p>
        </div>
      {blogList(user)}
    </div>
  )
}

export default BlogList