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

    const locator = page.getByRole("heading", {name: 'Blogs'} )
    await expect(locator).toBeVisible()
  })

  // Exercise 5.18 Blog List End To End Testing, step 2
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'ElvisTax', 'hemligt')
      await expect(page.getByRole('button', {name: 'logout'})).toBeVisible()
      await expect(page.getByRole("heading", {name: 'Blogs'} )).toBeVisible()
      await expect(page.getByText('ElvisTax logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'ElvisTax', 'wrong')
      await expect(page.getByText('Wrong username or password')).toBeVisible()
      await expect(page.getByRole("heading", {name: 'Blogs'} )).toBeVisible()
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
        await page.getByRole('link',{name: 'Elvis testing playwright by Elvis'}).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
    })

    // Exercise 5.21 Blog List End To End Testing, step 5
    test('and the blog can be deleted', async ({ page }) => {
        await createBlog(page, 'Elvis testing playwright', 'Elvis', 'www.elvistax.com')
        await page.getByRole('link',{name: 'Elvis testing playwright by Elvis'}).click()
        page.on('dialog', async dialog => {
            console.log('Dialog: ', dialog.message());
        await dialog.accept();
       });
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByRole('link',{name: 'Elvis testing playwright by Elvis'})).not.toBeVisible()
    })

    // Exercise 5.22 Blog List End To End Testing, step 6
    test('only the user who created a blog can see the delete button', async ({ page, request }) => {
        await createBlog(page, 'Elvis testing playwright', 'Elvis', 'www.elvistax.com')
        await page.getByText('ElvisTax logged in').waitFor()
        await page.getByRole('link',{name: 'Elvis testing playwright by Elvis'}).click()
        await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
        await page.getByRole('button', { name: 'logout' }).click()

        await loginWith(page, 'OonaTax', 'hemligt')
        await page.getByText('OonaTax logged in').waitFor()
        await page.getByRole('link',{name: 'Elvis testing playwright by Elvis'}).click()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    // Exercise 5.23 Blog List End To End Testing, step 7
    test('blogs are ordered according to likes with the blog with the most likes being first', async ({ page, request }) => {
        await createBlog(page, 'Elvis testing playwright', 'Elvis', 'www.elvistax.com')
        await createBlog(page, 'Oona testing playwright', 'Oona', 'www.oonatax.com')
        await createBlog(page, 'Lando testing playwright', 'Lando', 'www.landovovve.com')

        await page.getByRole('link',{name: 'Elvis testing playwright by Elvis'}).waitFor()
        await page.getByRole('link',{name: 'Oona testing playwright by Oona'}).waitFor()
        await page.getByRole('link',{name: 'Lando testing playwright by Lando'}).waitFor()

        await page.getByRole('link',{name: 'Elvis testing playwright by Elvis'}).click() 
        await expect(page.getByRole('heading', {name: 'Elvis testing playwright by Elvis'})).toBeVisible()  
        await page.getByRole('button', { name: 'like' }).click()
        await page.getByText('Likes 1').waitFor()
        await expect(page.getByText('Likes 1')).toBeVisible()
        await page.getByRole('link', { name: 'blogs' }).click()
        await expect(page.getByRole("heading", {name: 'Blogs'} )).toBeVisible()

        await page.getByRole('link',{name: 'Lando testing playwright by Lando'}).click()
        await expect(page.getByRole('heading', {name: 'Lando testing playwright by Lando'})).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await page.getByText('Likes 1').waitFor()
        await page.getByRole('button', { name: 'like' }).click()
        await page.getByText('Likes 2').waitFor()
        expect(page.getByText('Likes 2')).toBeVisible()
        await page.getByRole('link', { name: 'blogs' }).click()
        await expect(page.getByRole("heading", {name: 'Blogs'} )).toBeVisible()

        await page.getByRole('link',{name: 'Oona testing playwright by Oona'}).click()
        await expect(page.getByRole('heading', {name: 'Oona testing playwright by Oona'})).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await page.getByText('Likes 1').waitFor()
        await page.getByRole('button', { name: 'like' }).click()
        await page.getByText('Likes 2').waitFor()
        await page.getByRole('button', { name: 'like' }).click()
        await page.getByText('Likes 3').waitFor()
        expect(page.getByText('Likes 3')).toBeVisible()
        await page.getByRole('link', { name: 'blogs' }).click()
        await expect(page.getByRole("heading", {name: 'Blogs'} )).toBeVisible()

        const blogs = await page.getByRole('listitem').all()
        console.log('blogs:', blogs)
        const firstBlog = await blogs[0]
        const secondBlog = await blogs[1]
        const thirdBlog = await blogs[2]

        await expect(firstBlog).toContainText('Oona testing playwright by Oona')
        await expect(secondBlog).toContainText('Lando testing playwright by Lando')
        await expect(thirdBlog).toContainText('Elvis testing playwright by Elvis')

    })    
  })
})