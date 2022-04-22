import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog.js testing', () => {
  test('5.13 displaying a blog renders the blog\'s title and author, , but does not render its url or number of likes by default.', () => {
    const newBlog = {
      title: 'test blog',
      author: 'aamir',
      url: 'test.com',
      likes: 2,
      user: '623356beaadcddbcd38e9403',
      id: '6236d4a383a62de8c34cf09e',
    };

    // render(<Blog onBlogRemove={()=>{}} onBlogUpdate={()=>{}} blog={newBlog} />)
    // screen.debug();
    // const element = screen.getByText('Component testing is done with react-testing-library aamirkhattak')
    // expect(element).toBeDefined()

    const { container } = render(
      <Blog onBlogRemove={() => {}} onBlogUpdate={() => {}} blog={newBlog} />
    );
    // screen.debug()
    const div = container.querySelector('.blogStyle');
    expect(div).toHaveTextContent('test blog aamir');
  });

  test('5.14 blog\'s url and number of likes are shown when the button controlling the shown details has been clicked.', () => {
    const newBlog = {
      title: 'test blog',
      author: 'aamir',
      url: 'test.com',
      likes: 2,
      user: '623356beaadcddbcd38e9403',
      id: '6236d4a383a62de8c34cf09e',
    };

    const container = render(
      <Blog onBlogRemove={() => {}} onBlogUpdate={() => {}} blog={newBlog} />
    ).container;

    const button = screen.getByText('view');
    userEvent.click(button);

    const div = container.querySelector('.blogStyle');
    expect(div).toHaveTextContent('test blog hidetest.com2likeaamir');
  });

  test('5.15 if the like button is clicked twice, the event handler the component received as props is called twice.', () => {
    const newBlog = {
      title: 'test blog',
      author: 'aamir',
      url: 'test.com',
      likes: 2,
      user: '623356beaadcddbcd38e9403',
      id: '6236d4a383a62de8c34cf09e',
    };

    const mockHanlderOnBlogUpdate = jest.fn();

    render(
      <Blog
        onBlogRemove={() => {}}
        onBlogUpdate={mockHanlderOnBlogUpdate}
        blog={newBlog}
      />
    );

    const viewButton = screen.getByText('view');
    userEvent.click(viewButton);

    const likeButton = screen.getByText('like');
    userEvent.click(likeButton);
    userEvent.click(likeButton);

    expect(mockHanlderOnBlogUpdate.mock.calls).toHaveLength(2);
  });
});
