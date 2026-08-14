// Exercise 5.24 Router blogs, step1
import { useState, useEffect, useRef, useNavigate } from 'react'

import blogService from '../services/blogs'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Notification from './Notification'

const BlogList = ({user, blogs, message, handleLogout, addBlog, addLike, removeBlog}) => {


  const blogFormRef = useRef() // Exercise 5.5 Blog List Frontend, step 5


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
  console.log('user: ', user)

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
      <div>
       {blogForm()}
      </div>
      {blogList(user)}
    </div>
  )
}

export default BlogList