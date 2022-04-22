import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

describe('BlogForm.js', () => {
  test('5.16: the form calls the event handler it received as props with the right details when a new blog is created', () => {
    const mockOnBlogFormSubmit = jest.fn();

    render(
      <BlogForm
        handleNotification={() => {}}
        onBlogFormSubmit={mockOnBlogFormSubmit}
      />
    );

    const inputTitle = screen.getByPlaceholderText('title');
    const inputAuthor = screen.getByPlaceholderText('author');
    const inputURL = screen.getByPlaceholderText('url');
    const createButton = screen.getByText('create');

    userEvent.type(inputTitle, 'testing a form...');
    userEvent.type(inputAuthor, 'temp Author');
    userEvent.type(inputURL, 'test.localhost.com/temp');
    userEvent.click(createButton);

    expect(mockOnBlogFormSubmit.mock.calls).toHaveLength(1);

    expect(mockOnBlogFormSubmit.mock.calls[0][0].title).toBe(
      'testing a form...'
    );
    expect(mockOnBlogFormSubmit.mock.calls[0][0].author).toBe('temp Author');
    expect(mockOnBlogFormSubmit.mock.calls[0][0].url).toBe(
      'test.localhost.com/temp'
    );
  });
});
