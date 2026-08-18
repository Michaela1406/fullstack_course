// Exercise 5.13: Blog List Tests, step 1

import { render, screen } from '@testing-library/react'
import { test, expect, describe, beforeEach, vi } from 'vitest'
import * as Router from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const navigateMock = vi.fn()

const useParamsMock = vi.fn().mockReturnValue({ id: '123' })

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => useParamsMock(),
    useNavigate: () => navigateMock
  }
})

describe('<Blog /> with logged in blog creator', () => {
  let updateLikes
  let deletedBlog

  beforeEach(() => {

    const blog = {
      title: 'Test Adventures',
      author: 'ElvisTax',
      url: 'http://testadventures.com',
      likes: 5,
      user: {
        username: 'root',
        name: 'SuperUser'
      }
    }

    const loggedUser = {
      username: 'root',
      name: 'SuperUser'
    }

    updateLikes = vi.fn()
    deletedBlog = vi.fn()

    render(<Blog blog={blog} updateLikes={updateLikes} deletedBlog={deletedBlog} user={loggedUser}/>)
  })


  test('renders content', () => {
    const element = document.querySelector('.blogAllDetails')
    expect(element).toHaveTextContent(
      'Test Adventures by ElvisTax'
    )
  })

  test("does render url, likes, likebutton and deletebutton when blog's creator is logged in", () => {
    const element = document.querySelector('.blogAllDetails')
    expect(element).toHaveTextContent('likes 5')
    expect(element).toHaveTextContent('http://testadventures.com')
    expect(element).toHaveTextContent('Added by root')
    const likeButton = screen.getByText('like')
    expect(likeButton).toBeDefined()
    const deleteButton = screen.getByText('remove')
    expect(deleteButton).toBeDefined()
  })

  // Exercise 5.14: Blog List Tests, step 2
  /*test('renders url and likes when view button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const urlElement = screen.getByText('url: http://testadventures.com', { exact: false })
    expect(urlElement).toBeDefined()

    const likesElement = screen.getByText('likes: 5', { exact: false })
    e
    */

  // Exercise 5.15: Blog List Tests, step 3
  test('if like button is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup()

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    const likes = screen.getByText('likes', { exact: false })
    expect(likes).toBeDefined()
    expect(updateLikes.mock.calls).toHaveLength(2)
  })
})

describe('<Blog /> with logged in user', () => {

  let updateLikes
  let deletedBlog

  beforeEach(() => {

    const blog = {
      title: 'Test Adventures',
      author: 'ElvisTax',
      url: 'http://testadventures.com',
      likes: 5,
      user: {
        username: 'root',
        name: 'SuperUser'
      }
    }

    const loggedUser = {
      username: 'tester',
      name: 'TestUser'
    }

    updateLikes = vi.fn()
    deletedBlog = vi.fn()

    render(<Blog blog={blog} updateLikes={updateLikes} deletedBlog={deletedBlog} user={loggedUser}/>)
  })

  test("does render url, likes, likebutton but no deletebutton when authenticated users is logged in", () => {
    const element = document.querySelector('.blogAllDetails')
    expect(element).toHaveTextContent('likes 5')
    expect(element).toHaveTextContent('http://testadventures.com')
    expect(element).toHaveTextContent('Added by root')
    const likeButton = screen.getByTestId('likeButton')
    expect(likeButton).toBeDefined()

    const deleteButton = screen.queryByText('remove')
    expect(deleteButton).not.toBeInTheDocument()
  })


})

describe('<Blog /> with no logged in user', () => {
  let updateLikes
  let deletedBlog

  beforeEach(() => {
    const blog = {
        title: 'Test Adventures',
        author: 'ElvisTax',
        url: 'http://testadventures.com',
        likes: 5,
        user: {
          username: 'root',
          name: 'SuperUser'
        }
      }

      updateLikes = vi.fn()
      deletedBlog = vi.fn()

      render(<Blog blog={blog} updateLikes={updateLikes} deletedBlog={deletedBlog} user={null}/>)
  })

  test("does render url, likes, but no likebutton and no deletebutton when no users is logged in", () => {
    const element = document.querySelector('.blogAllDetails')
    expect(element).toHaveTextContent('likes 5')
    expect(element).toHaveTextContent('http://testadventures.com')
    expect(element).toHaveTextContent('Added by root')
    const likeButton = screen.queryByText('like')
    expect(likeButton).not.toBeInTheDocument()
    const deleteButton = screen.queryByText('remove')
    expect(deleteButton).not.toBeInTheDocument()
  })
})