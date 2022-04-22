import React, { useState } from 'react';

import PropTypes from 'prop-types';

export default function BlogForm({ onBlogFormSubmit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const handleCreate = async (event) => {
    event.preventDefault();
    const newBlog = { title, author, url };
    onBlogFormSubmit(newBlog);
    setTitle('');
    setAuthor('');
    setURL('');
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleCreate}>
        <div>
          title :
          <input
            type="text"
            value={title}
            name="Title"
            placeholder="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>{' '}
        <div>
          Author
          <input
            type="text"
            value={author}
            name="Author"
            placeholder="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            placeholder="url"
            id="url"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button id='create-btn' type='submit'>create</button>
      </form>
    </div>
  );
}

BlogForm.propTypes = {
  onBlogFormSubmit: PropTypes.func.isRequired,
  handleNotification: PropTypes.func,
};
