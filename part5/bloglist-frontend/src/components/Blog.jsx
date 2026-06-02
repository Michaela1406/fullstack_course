import { useState } from 'react'

const Blog = ({ blog, updatedBlog, deletedBlog }) => {
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
    updatedBlog ({
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

  return (
    <div style={blogStyle}>
      {visible ? (
        <div>
          {blog.title}
          <button onClick={toggleVisibility}>hide</button>
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes}<button onClick ={addLike}>like</button></p>
          <p>author: {blog.author}</p>
          {blog.user && blog.user.username === JSON.parse(window.localStorage.getItem('loggedNoteappUser')).username && (
            <button onClick={deleteBlog}>remove</button>
          )}
        </div>
      ) : (
        <div>
          {blog.title} - author: {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
      )}
    </div>
  )
}

export default Blog