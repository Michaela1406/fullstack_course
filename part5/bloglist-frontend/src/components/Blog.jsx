import { useState } from 'react'

const Blog = ({ blog, updateLikes, deletedBlog, user }) => {
  // Exercise 7.7 Blog List Frontend, step 7
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // Exercise 5.8 Blog List Frontend, step 8
  const addLike = (event) => {
    event.preventDefault()
    updateLikes ({
      ...blog,
      likes: blog.likes + 1
    })
  }

  // Exercise 5.11 Blog List Frontend, step 11
  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deletedBlog(blog, true)
    }
  }
  console.log('blog: ', blog)
  console.log('blog.user: ', blog.user)
  console.log('blog.user.username: ', blog.user.username)
  console.log('user: ', user)
  console.log('user.username: ', user.username)

  return (
    <div style={blogStyle}>
      {visible ? (
        <div className='blogAllDetails'>
          {blog.title}
          <button onClick={toggleVisibility}>hide</button>
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes}<button onClick ={addLike}>like</button></p>
          <p>author: {blog.author}</p>
          {blog.user && blog.user.username === user.username && (
            <button onClick={deleteBlog}>remove</button>
          )}
        </div>
      ) : (
        <div className ="blog">
          {blog.title} - author: {blog.author}
          <button className='view' onClick={toggleVisibility}>view</button>
        </div>
      )}
    </div>
  )
}

export default Blog