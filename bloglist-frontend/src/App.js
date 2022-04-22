import { useState, useEffect, useRef } from 'react';

import './App.css';
import Blog from './components/Blog';
import blogService from './services/blogs';

import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

/*
TODO: Modify the application to list the blog posts by the number of likes


*/
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(undefined);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((blogA, blogB) => blogB.likes - blogA.likes); //sorts blogs by likes in ascending order of likes
      setBlogs(blogs);
    });
  }, []);

  const onLogin = (userDetails) => {
    setUser(userDetails);
  };

  const handleNotification = (notification, type = undefined) => {
    setNotification({ message: notification, type: type });
    setTimeout(() => {
      setNotification(undefined);
    }, 5000);
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInUser');
  };

  if (user === null) {
    return (
      <div>
        <h1>Login into application</h1>
        <Notification notification={notification} />
        <Login onLogin={onLogin} handleNotification={handleNotification} />
      </div>
    );
  }

  const onBlogFormSubmit = async (newBlog) => {
    try {
      const responseNewBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(responseNewBlog));
      blogFormRef.current.toggleVisibility();

      handleNotification(
        `a new blog ${responseNewBlog.title} by ${responseNewBlog.author} added.`,
        'success'
      );
    } catch (error) {
      handleNotification(error.message);
    }
  };

  const onBlogRemove = async (blogToBeRemoved) => {
    try {
      await blogService.remove(blogToBeRemoved.id);
      const blogsAfterRemove = blogs.filter(
        (currBlog) => currBlog.id !== blogToBeRemoved.id
      );
      setBlogs(blogsAfterRemove);
    } catch (error) {
      alert(`${error.message} \n ${error.config.method} ${error.config.url}`);
    }
  };

  const onBlogUpdate = async (blogToBeUpdated) => {
    try {
      const updatedBlog = await blogService.update(
        blogToBeUpdated.id,
        blogToBeUpdated
      );

      const blogsAfterUpdate = blogs.map((currBlog) =>
        currBlog.id === updatedBlog.id ? updatedBlog : currBlog
      );
      blogsAfterUpdate.sort((blogA, blogB) => blogB.likes - blogA.likes);
      setBlogs(blogsAfterUpdate);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm onBlogFormSubmit={onBlogFormSubmit} />
      </Togglable>
      <br />
      <div className="blogs">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            onBlogRemove={onBlogRemove}
            onBlogUpdate={onBlogUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
