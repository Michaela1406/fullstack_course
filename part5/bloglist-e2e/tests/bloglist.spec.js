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
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Oona',
        username: 'OonaTax',
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

    // Exercise 5.20 Blog List End To End Testing, step 4
    test('and the blog can be liked', async ({ page }) => {
        await createBlog(page, 'Elvis testing playwright', 'Elvis', 'www.elvistax.com')
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes: 1')).toBeVisible()
    })

    // Exercise 5.21 Blog List End To End Testing, step 5
    test('and the blog can be deleted', async ({ page }) => {
        await createBlog(page, 'Elvis testing playwright', 'Elvis', 'www.elvistax.com')
        await page.getByRole('button', { name: 'view' }).click()
        page.on('dialog', async dialog => {
            console.log('Dialog: ', dialog.message());
        await dialog.accept();
       });
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('Elvis testing playwright - author: Elvis')).not.toBeVisible()
    })

    // Exercise 5.22 Blog List End To End Testing, step 6
    test('only the user who created a blog can see the delete button', async ({ page, request }) => {
        await createBlog(page, 'Elvis testing playwright', 'Elvis', 'www.elvistax.com')
        await page.getByText('ElvisTax logged in').waitFor()
        await expect(page.getByText('Elvis testing playwright - author: Elvis')).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
        await page.getByRole('button', { name: 'logout' }).click()

        await loginWith(page, 'OonaTax', 'hemligt')
        await page.getByText('OonaTax logged in').waitFor()
        await expect(page.getByText('Elvis testing playwright - author: Elvis')).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
  })
})