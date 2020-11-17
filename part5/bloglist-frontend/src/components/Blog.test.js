import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title:'The Real Texas',
    author: 'Annette Gordon-Reed',
    url: 'https://getpocket.com/explore/item/the-real-texas',
    likes: 3
  }
  let component
  const mock = jest.fn()
  const mockClick = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} setMessage={mockClick} setBlogs={mock} blogs={{}} />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'The Real Texas','Annette Gordon-Reed'
    )
  })

  test('at start the detail are not displayed', () => {
    const div = component.container.querySelector('.detail')
    expect(div).toHaveStyle('display: none')
  })

  test('clicking the view button the detail are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.detail')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking the like button twice', () => {
    const like= component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)
    expect(mockClick.mock.calls).toHaveLength(2)
  })
})