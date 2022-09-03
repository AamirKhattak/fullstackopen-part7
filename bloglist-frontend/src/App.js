import { useEffect, useRef } from 'react';
import {
  Link,
  Route,
  Switch,
  // Link,
  // Navigate,
  // useParams,
  // useNavigate,
  // useMatch
} from 'react-router-dom';

import './App.css';
// import Blog from './components/Blog';

import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducers';
import { logoutUser, setUser } from './reducers/userMngmntReducer';
import UsersList from './components/UsersList';
import BlogsList from './components/BlogsList';
import UserBlogView from './components/UserBlogView';
import { initializeUsers } from './reducers/usersReducer';
import BlogView from './components/BlogView';

const Menu = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(({ loggedInUser }) => loggedInUser);
  const padding = {
    paddingRight: 5,
  };
  return (
    <div style={{ backgroundColor: 'lightgray' }}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {loggedInUser.name} ({loggedInUser.username}) logged in{' '}
      <button onClick={() => dispatch(logoutUser())}>logout</button>
    </div>
  );
};

const App = () => {
  //.sort((blogA, blogB) => blogB.likes - blogA.likes);

  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const { blogs, loggedInUser, users } = useSelector(
    ({ blogs, loggedInUser, users }) => {
      return { blogs, loggedInUser, users };
    }
  );

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  if (loggedInUser === null) {
    return (
      <div>
        <h1>Login into application</h1>
        <Notification />
        <Login />
      </div>
    );
  }

  if (!blogs) return <div>loading</div>;

  return (
    <div>
      <Menu />
      <h2>blogs app</h2>
      <Notification />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <div>
        <Switch>
          <Route exact path="/">
            <BlogsList blogs={blogs} />
          </Route>
          <Route exact path="/users">
            <UsersList users={users} />
          </Route>
          <Route exact path="/users/:id">
            <UserBlogView users={users} />
          </Route>
          <Route path="/blogs/:id">
            <BlogView blogs={blogs} />
          </Route>
          <Route path="/blogs">
            <BlogsList blogs={blogs} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
