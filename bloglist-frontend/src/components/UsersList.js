import React from 'react';
import { Link } from 'react-router-dom';

export default function UsersList({ users }) {
  console.log('users', users);
  if (!users) return null;

  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>no. of blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>
                    {user.name}
                    <small>({user.username})</small>
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
