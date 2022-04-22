import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, onBlogRemove, onBlogUpdate }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

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
    onBlogUpdate(updatedBlog);
  };

  const handleOnRemove = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by "${blog.author}"`)) {
      //as usernames are unique, we can compare blog creator by username instead of userId
      onBlogRemove(blog);
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
          {blog.title} <button onClick={toggleVisiblity}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p className="likes">
          <span>{blog.likes}</span>
          <button onClick={handleOnLike}>like</button>
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
      {blog.title} {blog.author}
      <button onClick={toggleVisiblity}>view</button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onBlogRemove: PropTypes.func.isRequired,
  onBlogUpdate: PropTypes.func.isRequired,
};

export default Blog;
