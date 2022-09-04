import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { newCommentBlog } from '../reducers/blogsReducers';
import { BlueButton } from '../styled-components/styled-components';

export default function BlogCommentsForm({ blogId }) {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

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
      <BlueButton onClick={handleAddComment}>add comment</BlueButton>
    </div>
  );
}
