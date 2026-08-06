// Exercise 5.17 Blog List End To End Testing, step 1
const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Elvis',
        username: 'ElvisTax',
        password: 'hemligt'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const locator = page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  // Exercise 5.18 Blog List End To End Testing, step 2
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'ElvisTax', 'hemligt')
      await expect(page.getByText('ElvisTax logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'ElvisTax', 'wrong')
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  // Exercise 5.19 Blog List End To End Testing, step 3
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'ElvisTax', 'hemligt')
    })

    test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'Elvis testing playwright', 'Elvis', 'www.elvistax.com')
    })
  })
})