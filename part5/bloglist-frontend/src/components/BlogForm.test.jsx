// Exercise 5.16 Blog List Tests, step 4
import { render, screen } from '@testing-library/react'
import {  test, expect, vi } from 'vitest'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> adds a new Blogpost and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByLabelText('title')
  const author = screen.getByLabelText('author')
  const url = screen.getByLabelText('url')
  const sendButton = screen.getByText('create')

  await user.type(title, 'TestAdventures')
  await user.type(author, 'ElvisTax')
  await user.type(url, 'http://testadventures.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('TestAdventures')
  expect(createBlog.mock.calls[0][0].author).toBe('ElvisTax')
  expect(createBlog.mock.calls[0][0].url).toBe('http://testadventures.com')
})
