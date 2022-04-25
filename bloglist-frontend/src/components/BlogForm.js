import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogsReducers';

export default function BlogForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();
    const newBlog = { title, author, url };
    try {
      dispatch(createBlog(newBlog));
      dispatch(setNotification(`a new blog "${title}" by "${author}" added.`));
    } catch (error) {
      dispatch(setNotification(error.message));
    }

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
        <button id="create-btn" type="submit">
          create
        </button>
      </form>
    </div>
  );
}
