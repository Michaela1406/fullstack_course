// Exercise 4.2 Blog list step 2

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author || 'Unknown Author',
    url: body.url,
    likes: body.likes || 0,
  })

  const savedBlog = await blog.save()
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