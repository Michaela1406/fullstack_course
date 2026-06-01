import { useState } from 'react'

const Blog = ({ blog }) => {
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

  return (
  <div style={blogStyle}>
    {visible ? (
      <div>
        {blog.title}
        <button onClick={toggleVisibility}>hide</button>
        <p>author: {blog.author}</p>
        <p>{blog.url}</p>
        <p>likes: {blog.likes}<button>like</button></p>
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