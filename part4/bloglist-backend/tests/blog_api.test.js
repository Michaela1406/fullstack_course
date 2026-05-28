// Exercise 4.8: Blog List Tests, step 1
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  let authToken
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const testUser = new User({
      username: 'testUser',
      name: 'Mister Test',
      passwordHash
    })
    await testUser.save()
    //const users = await helper.usersInDb()
    //console.log('users', users)

    const loginTestUser = await api
      .post('/api/login')
      .send({ username: 'testUser', password: 'secret' })
      .expect(200)
    authToken = loginTestUser.body.token
    //console.log('authToken:', authToken)

    await Blog.deleteMany({})
    const startBlog = {
      title: 'Test Blog',
      author: 'Mister Test',
      url: 'http://example.com/test-blog',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(startBlog)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    //const blogsAtStart = await helper.blogsInDb()
    //console.log('blogsAtStart:', blogsAtStart)

  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const blogs  = await helper.blogsInDb()

    assert.strictEqual(blogs.length, 1)
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
        .set('Authorization', `Bearer ${authToken}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

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
        .set('Authorization', `Bearer ${authToken}`)
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
        .set('Authorization', `Bearer ${authToken}`)
        .expect(400)

      const newBlogNoUrl = {
        title: 'Adventures of Elvis',
        author: 'Elvis Tax'
      }

      await api
        .post('/api/blogs')
        .send(newBlogNoUrl)
        .set('Authorization', `Bearer ${authToken}`)
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
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const ids = blogsAtEnd.map(b => b.id)

      assert(!ids.includes(blogToDelete.id))
      assert.strictEqual(blogsAtEnd.length, 0)
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
      assert.strictEqual(blogsAtEnd.length, 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})