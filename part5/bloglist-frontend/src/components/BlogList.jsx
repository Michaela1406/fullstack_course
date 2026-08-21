// Exercise 5.24 Router blogs, step1
import { useState, useEffect, useRef, useNavigate } from 'react'
import { Link } from 'react-router-dom'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

import blogService from '../services/blogs'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Notification from './Notification'

const BlogList = ({user, blogs}) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  }, [])


  const blogList = (user) => (
    <div>
    <TableContainer component={Paper}>
        <Table>
          <TableHead>
          </TableHead>
          <TableBody>
            {blogs.sort((a,b) => b.likes - a.likes).map(blog => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )

  if (user === null) {
    return (
      <div>
        <h2>Blogs</h2>
        {blogList(user)}
      </div>
    )
  }
  return (
    <div>
      <h2>Blogs</h2>
      {blogList(user)}
    </div>
  )
}

export default BlogList