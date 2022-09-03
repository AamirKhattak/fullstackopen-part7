import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { newCommentBlog } from '../reducers/blogsReducers';

export default function BlogCommentsForm({ blogId }) {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  // const handleCreate = async (event) => {
  //   event.preventDefault();
  //   const newBlog = { title, author, url };
  //   try {
  //     dispatch(createBlog(newBlog));
  //     dispatch(setNotification(`a new blog "${title}" by "${author}" added.`));
  //   } catch (error) {
  //     dispatch(setNotification(error.message));
  //   }
  // };

  const handleAddComment = () => {
    console.log(blogId, comment);
    // return;
    try {
      dispatch(newCommentBlog(blogId, comment));
      setComment('');
    } catch (error) {
      dispatch(setNotification(error.message));
    }
  };

  return (
    <div>
      <input
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button onClick={handleAddComment}>add comment</button>
    </div>
  );
}
