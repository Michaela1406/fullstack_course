// Exercise 5.3 Blog List Frontend, step 3
// Exercise 5.6 Blog List Frontend, step 6
import { useState } from 'react'
import { TextField, Button  } from '@mui/material'

import Notification from './Notification'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form id="blog-form" onSubmit={addBlog}>
        <div>
          <TextField variant='outlined'
            label="title"
            size="small"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <br/>
        <div>
          <TextField variant='outlined'
            label="author"
            size="small"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <br/>
        <div>
          <TextField variant='outlined'
            label="url"
            size="small"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
            create
          </Button>
        </div>
      </form>
    </div>)
}

export default BlogForm