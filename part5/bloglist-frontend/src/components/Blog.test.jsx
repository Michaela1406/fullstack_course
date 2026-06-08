// Exercise 5.13: Blog List Tests, step 1

import { render, screen } from '@testing-library/react'
import { test, expect, describe, beforeEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let updateLikes
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

    render(<Blog blog={blog} updateLikes={updateLikes} user={loggedUser}/>)
  })


  test('renders content', () => {
    const element = document.querySelector('.blog')
    expect(element).toHaveTextContent(
      'Test Adventures - author: ElvisTax'
    )
  })

  test('does not render url and likes by default', () => {
    const element = document.querySelector('.blogAllDetails')
    expect(element).toBeNull()
  })

  // Exercise 5.14: Blog List Tests, step 2
  test('renders url and likes when view button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const urlElement = screen.getByText('url: http://testadventures.com', { exact: false })
    expect(urlElement).toBeDefined()

    const likesElement = screen.getByText('likes: 5', { exact: false })
    expect(likesElement).toBeDefined()
  })

  // Exercise 5.15: Blog List Tests, step 3
  test('if like button is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    const likes = screen.getByText('Likes:', { exact: false })
    expect(likes).toBeDefined()
    expect(updateLikes.mock.calls).toHaveLength(2)
  })
})