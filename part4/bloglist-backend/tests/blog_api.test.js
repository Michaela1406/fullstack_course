// Exercise 4.8: Blog List Tests, step 1
const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const blogs  = await helper.blogsInDb()

  assert.strictEqual(blogs.length, helper.initialBlogs.length)
})

// Exercise 4.9: Blog List Tests, step 2

test('all blogs have an id property, but not an _id property', async () => {
    const blogs = await helper.blogsInDb()
     blogs.forEach(blog => {
        assert.strictEqual(blog._id, undefined)
        assert.notStrictEqual(blog.id, undefined)
     })
})

// Exercise 4.10: Blog List Tests, step 3

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'New blog',
        author: 'Test Author',
        url: 'http://example.com/new-blog',
        likes: 4,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('New blog'))
})


after(async () => {
  await mongoose.connection.close()
})