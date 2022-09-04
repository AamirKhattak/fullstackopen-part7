import { useState } from 'react';

import { likeBlog, deleteBlog } from '../reducers/blogsReducers';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { Link } from 'react-router-dom';
import { BlueButton, GreenButton, RedButton } from '../styled-components/styled-components';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch();

  const [viewDetails, setViewDetails] = useState(false);

  const toggleVisiblity = () => {
    setViewDetails(!viewDetails);
  };

  const handleOnLike = () => {
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };
    try {
      dispatch(likeBlog(updatedBlog.id, updatedBlog));
    } catch (error) {
      dispatch(setNotification(error.message));
    }
  };

  const handleOnRemove = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by "${blog.author}"`)) {
      //as usernames are unique, we can compare blog creator by username instead of userId
      try {
        dispatch(deleteBlog(blog.id));
      } catch (error) {
        dispatch(setNotification(error.message));
      }
    }
  };

  const checkIfUserIsCreatorOfBlog = () => {
    const loggedInUser = window.localStorage.loggedInUser
      ? JSON.parse(window.localStorage.loggedInUser)
      : undefined;
    if (loggedInUser) {
      return blog.user.username === loggedInUser.username;
    } else {
      return false;
    }
  };

  if (viewDetails) {
    return (
      <div style={blogStyle} className="blogStyle">
        <p>
          {blog.title} <RedButton onClick={toggleVisiblity}>hide</RedButton>
        </p>
        <p>{blog.url}</p>
        <p className="likes">
          <span>{blog.likes}</span>
          <GreenButton onClick={handleOnLike}>like</GreenButton>
        </p>
        <p>{blog.author}</p>
        {checkIfUserIsCreatorOfBlog() && (
          <p>
            <button onClick={handleOnRemove}>remove</button>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="blogStyle" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      <BlueButton onClick={toggleVisiblity}>view</BlueButton>
    </div>
  );
};

export default Blog;
