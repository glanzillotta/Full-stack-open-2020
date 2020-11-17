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

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
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
  test('clicking the button calls event handler once', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.detail')
    expect(div).not.toHaveStyle('display: none')
  })
})