// Exercise 4.8: Blog List Tests, step 1
const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
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

  describe('addition of a new blog', () => {
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

    // Exercise 4.11: Blog List Tests, step 4

    test('if likes property is missing, it defaults to 0', async () => {
      const newBlog = {
        title: 'Blog without likes',
        author: 'Test Author',
        url: 'http://example.com/blog-without-likes',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const addedBlog = blogsAtEnd.find(b => b.title === 'Blog without likes')
      assert.strictEqual(addedBlog.likes, 0)
    })

    // Exercise 4.12: Blog List Tests, step 5

    test('blog without title and url is not added', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const newBlogNoTitle = {
        author: 'Elvis Tax',
        url: 'elvis.tax.uk'
      }

      await api
        .post('/api/blogs')
        .send(newBlogNoTitle)
        .expect(400)

      const newBlogNoUrl = {
        title: 'Adventures of Elvis',
        author: 'Elvis Tax'
      }

      await api
        .post('/api/blogs')
        .send(newBlogNoUrl)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
  })

  // Exercise 4.14: Blog List Expansions, step 1
  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const ids = blogsAtEnd.map(b => b.id)

      assert(!ids.includes(blogToDelete.id))
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

  // Exercise 4.14: Blog List Expansions, step 2

  describe('updating a blog', () => {
    test('succeeds with valid data', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlogData = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: blogToUpdate.likes + 1,
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlogData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)

      assert.strictEqual(updatedBlog.title, blogToUpdate.title)
      assert.strictEqual(updatedBlog.author, blogToUpdate.author)
      assert.strictEqual(updatedBlog.url, blogToUpdate.url)
      assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1)
    })

    test('fails with status code 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      const updatedBlogData = {
        title: 'Non-existing blog',
        author: 'Test Author',
        url: 'http://example.com/non-existing-blog',
        likes: 0,
      }

      await api
        .put(`/api/blogs/${validNonexistingId}`)
        .send(updatedBlogData)
        .expect(404)

      const blogsAtEnd = await helper.blogsInDb()
      const ids = blogsAtEnd.map(b => b.id)

      assert(!ids.includes(validNonexistingId))
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })
})


after(async () => {
  await mongoose.connection.close()
})