import React from 'react';
import { useParams } from 'react-router-dom';

import { likeBlog, deleteBlog } from '../reducers/blogsReducers';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import BlogCommentsForm from './BlogCommentsForm';
import { GreenButton } from '../styled-components/styled-components';

// const Blog = ({ blog }) => {

export default function BlogView({ blogs }) {
  const blogId = useParams().id;
  const blog = blogs.find((blog) => blog.id === blogId);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch();

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

  if (!blog) return null;
  console.log(blog.comments);
  return (
    <div style={blogStyle}>
      <h3>{blog.title}</h3>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <GreenButton onClick={handleOnLike}>likes</GreenButton>
      </div>
      <div>added by {blog.author}</div>
      {checkIfUserIsCreatorOfBlog() && (
        <p>
          <button onClick={handleOnRemove}>remove</button>
        </p>
      )}
      <div>
        <p>
          <b>comments</b>
        </p>
        <BlogCommentsForm blogId={blogId}/>
        <ul>
          {blog.comments &&
            blog.comments.map((comment) => <li key={comment}>{comment}</li>)}
          {blog.comments.length === 0 && <li>{'no comments added'}</li>}
        </ul>
      </div>
    </div>
  );
}
