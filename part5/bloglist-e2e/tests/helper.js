const {expect} = require('@playwright/test')

const loginWith = async (page, username, password)  => {
  await page.getByRole('link', {name: 'login'}).click();
  await expect(page.getByRole('heading', {name: 'Log in to application'})).toBeVisible()
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('link', { name: 'create blog' }).click()
    await page.getByLabel('title').fill(title)
    await page.getByLabel('author').fill(author)
    await page.getByLabel('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
    await page.getByRole('link', { name: 'blogs' }).click()
    await expect(page.getByRole("heading", {name: 'Blogs'} )).toBeVisible()
    await expect(page.getByRole('link',{name: title + ' by ' + author})).toBeVisible()
}

export { loginWith, createBlog }