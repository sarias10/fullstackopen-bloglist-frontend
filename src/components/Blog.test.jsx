import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders content', () => {
  const blog = {
    title: 'Testeando que aparezca titulo y autor',
    author: 'Sergio',
    url: 'https://hola.com/',
    likes: 800
  }
  render(<Blog blog = {blog}/>)

  const titleAuthorElement = screen.queryByText('Testeando que aparezca titulo y autor - Sergio')
  expect(titleAuthorElement).toBeDefined()
  //queryByText, devuelve el elemento pero no genera excepción sino se encuentra
  const urlElement = screen.queryByText('https://hola.com/')
  expect(urlElement).toBeNull()
  const likesElement = screen.queryByText('800')
  expect(likesElement).toBeNull()
})

test('click the view button once to display likes and URL', async () => {
  const blog = {
    title: 'Testeando que aparezca likes y url',
    author: 'Sergio',
    url: 'https://hola.com/',
    likes: 800
  }
  render(<Blog blog = {blog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likes = screen.getByText('likes 800')
  const url = screen.getByText('https://hola.com/')

  expect(likes).toBeDefined()
  expect(url).toBeDefined()
})

test('click button likes twice ', async () => {
  const blog = {
    title: 'Testeando que aparezca likes y url',
    author: 'Sergio',
    url: 'https://hola.com/',
    likes: 800
  }

  const mockHandler = vi.fn()
  render(<Blog blog = {blog} updateBlog={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  console.log('funcion simulada', mockHandler)
  expect(mockHandler.mock.calls).toHaveLength(2)
})