// Exercise 4.2 Blog list step 2

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// Exercise 4.17 Blog List Expansions, step 5
const User = require('../models/user')
// Exercise 4.19: Blog List Expansions, step 7
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 }) // Exercise 4.17 Blog List Expansions, step 5
  response.json(blogs)
})

// Exercise 4.19 Blog List Expansions, step 7
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


blogsRouter.post('/', async (request, response) => {
  const body = request.body

  // Exercise 4.19 Blog List Expansions, step 7
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  // Exercise 4.17 Blog List Expansions, step 5
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author || 'Unknown Author',
    url: body.url,
    likes: body.likes || 0,
    user: user._id // Exercise 4.17 Blog List Expansions, step 5
  })

  const savedBlog = await blog.save()
  // Exercise 4.17 Blog List Expansions, step 5
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

// Exercise 4.13: Blog List Expansions, step 1
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

// Exercise 4.14: Blog List Expansions, step 2
blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blotToUpdate = await Blog.findById(request.params.id)
  if (!blotToUpdate) {
    return response.status(404).end()
  }

  blotToUpdate.title = title
  blotToUpdate.author = author
  blotToUpdate.url = url
  blotToUpdate.likes = likes

  const updatedBlog = await blotToUpdate.save()
  response.json(updatedBlog)
})

module.exports = blogsRouter