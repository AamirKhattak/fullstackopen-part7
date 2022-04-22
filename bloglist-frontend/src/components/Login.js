import React, { useState } from 'react';
import blogsService from '../services/blogs';

import loginService from '../services/login';

export default function Login({ onLogin, handleNotification }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userToken = await loginService.login({ username, password });
      onLogin(userToken);
      window.localStorage.setItem('loggedInUser', JSON.stringify(userToken));
      blogsService.setToken(userToken.token);
    } catch (error) {
      handleNotification('wrong username or password');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>{' '}
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-btn" type="submit">
          login
        </button>
      </form>
    </div>
  );
}
