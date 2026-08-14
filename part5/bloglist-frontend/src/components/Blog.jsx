import { useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = ({ blog, updateLikes, deletedBlog, user }) => {
  // Exercise 7.7 Blog List Frontend, step 7
  //const [visible, setVisible] = useState(false)

  // Exercise 5.25 Router blogs, step2
  const id = useParams().id
  const navigate = useNavigate()

  if(!blog) {
    console.log('blog not found')
    return null
  }

  console.log('user in Blog.jsx: ', user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    navigate('/blogs')
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
      navigate('/blogs')
    }
  }

  return (
    <div style={blogStyle}>
        <div className='blogAllDetails'>
          {blog.author} : {blog.title} 
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes} {user && (
            <button onClick ={addLike}>like</button>
          )}</p>
          <p>Added by: {blog.user ? blog.user.username : 'Unknown'}</p>
          {user && blog.user && blog.user.username === user.username && (
            <button onClick={deleteBlog}>remove</button>
          )}
        </div>
    </div>
  )
}

export default Blog