const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'First blog',
    author: 'John Doe',
    url: 'http://example.com/first-blog',
    likes: 5,
  },
  {
    title: 'Second blog',
    author: 'Jane Doe',
    url: 'http://example.com/second-blog',
    likes: 10,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'test', url: 'http://example.com/test' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}