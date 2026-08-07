// Exercise 5.17 Blog List End To End Testing, step 1
const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Elvis',
        username: 'ElvisTax',
        password: 'hemligt'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Oona',
        username: 'OonaTax',
        password: 'hemligt'
      }
    })
    await page.goto('/')
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

    // Exercise 5.23 Blog List End To End Testing, step 7
    test('blogs are ordered according to likes with the blog with the most likes being first', async ({ page, request }) => {
        await createBlog(page, 'Elvis testing playwright', 'Elvis', 'www.elvistax.com')
        await createBlog(page, 'Oona testing playwright', 'Oona', 'www.oonatax.com')
        await createBlog(page, 'Lando testing playwright', 'Lando', 'www.landovovve.com')

        await page.getByText('Elvis testing playwright - author: Elvis').waitFor()
        await page.getByText('Oona testing playwright - author: Oona').waitFor()
        await page.getByText('Lando testing playwright - author: Lando').waitFor()

        const elvisBlog = await page.getByText('Elvis testing playwright - author: Elvis').locator('..')
        const oonaBlog = await page.getByText('Oona testing playwright - author: Oona').locator('..')
        const landoBlog = await page.getByText('Lando testing playwright - author: Lando').locator('..')

        await elvisBlog.getByRole('button', { name: 'view' }).click() 
        const elvisOpenBlog = await page.getByText('Elvis testing')   
        await elvisOpenBlog.getByRole('button', { name: 'like' }).click()
        await elvisOpenBlog.getByText('Likes: 1').waitFor()
        expect(elvisOpenBlog.getByText('Likes: 1')).toBeVisible()
        await elvisOpenBlog.getByRole('button', { name: 'hide' }).click()

        await landoBlog.getByRole('button', { name: 'view' }).click()
        const landoOpenBlog = await page.getByText('Lando testing')
        await landoOpenBlog.getByRole('button', { name: 'like' }).click()
        await landoOpenBlog.getByText('Likes: 1').waitFor()
        await landoOpenBlog.getByRole('button', { name: 'like' }).click()
        await landoOpenBlog.getByText('Likes: 2').waitFor()
        expect(landoOpenBlog.getByText('Likes: 2')).toBeVisible()
        await landoOpenBlog.getByRole('button', { name: 'hide' }).click()

        await oonaBlog.getByRole('button', { name: 'view' }).click()
        const oonaOpenBlog = await page.getByText('Oona testing')
        await oonaOpenBlog.getByRole('button', { name: 'like' }).click()
        await oonaOpenBlog.getByText('Likes: 1').waitFor()
        await oonaOpenBlog.getByRole('button', { name: 'like' }).click()
        await oonaOpenBlog.getByText('Likes: 2').waitFor()
        await oonaOpenBlog.getByRole('button', { name: 'like' }).click()
        await oonaOpenBlog.getByText('Likes: 3').waitFor()
        expect(oonaOpenBlog.getByText('Likes: 3')).toBeVisible()
        await oonaOpenBlog.getByRole('button', { name: 'hide' }).click()
        await page.getByText('Oona testing playwright - author: Oona').waitFor()

        const blogs = await page.locator('.blog')
        const firstBlog = await blogs.nth(0)
        const secondBlog = await blogs.nth(1)
        const thirdBlog = await blogs.nth(2)

        await expect(firstBlog).toContainText('Oona testing playwright - author: Oona')
        await expect(secondBlog).toContainText('Lando testing playwright - author: Lando')
        await expect(thirdBlog).toContainText('Elvis testing playwright - author: Elvis')

    })    
  })
})