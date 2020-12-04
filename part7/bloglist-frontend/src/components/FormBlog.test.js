import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import FormBlog from './FormBlog'

describe('<FormBlog />', () => {

  let component
  const mockSubmit= jest.fn()
  const mock = jest.fn()

  beforeEach(() => {
    component = render(
      <FormBlog setMessage={mockSubmit} setBlogs={mock} blogs={{}} blogFormRef={mock} />
    )
  })

  test('updates parent state and calls onSubmit with right values', () => {
    const author = component.container.querySelector('[name="author"]')
    const title = component.container.querySelector('[name="title"]')
    const url = component.container.querySelector('[name="url"]')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
      target: { value: 'new author' },
    })
    fireEvent.change(title, {
      target: { value: 'new title' },
    })
    fireEvent.change(url, {
      target: { value: 'new url' },
    })
    fireEvent.submit(form)

    expect(mockSubmit.mock.calls).toHaveLength(1)
    expect(mockSubmit.mock.calls[0][0].title).toBe('new title')
    expect(mockSubmit.mock.calls[0][0].author).toBe('new author')
    expect(mockSubmit.mock.calls[0][0].url).toBe('new url')
  })
})