import { useState, useEffect} from 'react'
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

  //console.log('user in Blog.jsx: ', user)
  //console.log('blog in Blog.jsx: ', blog)
  //console.log('blog.user in Blog.jsx: ', blog.user)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  /*const toggleVisibility = () => {
    navigate('/blogs')
  }*/

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
      navigate('/')
    }
  }

  return (
    <div style={blogStyle}>
        <div className='blogAllDetails'>
          <h2>{blog.title} by {blog.author}</h2>
          <p><a href={blog.url} target="_blank">{blog.url}</a></p>
          <p>likes {blog.likes} {user && (
            <button data-testid="likeButton" onClick ={addLike}>like</button>
          )}</p>
          <p>Added by {blog.user ? blog.user.username : 'Unknown'}</p>
          {user && blog.user && user.username === blog.user.username && (
            <button data-testid="deleteButton" onClick={deleteBlog}>remove</button>
          )}
        </div>
    </div>
  )
}

export default Blog