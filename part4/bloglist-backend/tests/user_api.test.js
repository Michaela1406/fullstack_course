const bcrypt = require('bcrypt')
const User = require('../models/user')
const assert = require('node:assert')
const mongoose = require('mongoose')
const { test, beforeEach, describe, after } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a valid username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ElvisTax',
      name: 'Elvis Tax',
      password: 'hemligt',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if password is invalid', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ElvisTax',
      name: 'Elvis Tax',
      password: 'he',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert.strictEqual(result.body.error, 'password is required and must be at least 3 characters long')
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert.strictEqual(result.body.error, 'expected `username` to be unique')
  })

  test('creation fails with proper statuscode and message if username is not defined', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert.strictEqual(result.body.error,('User validation failed: username: Path `username` is required.'))
  })

})

after(() => {
  mongoose.connection.close()
})