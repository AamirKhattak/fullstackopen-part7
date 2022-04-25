import React from 'react';
import { useParams } from 'react-router-dom';

export default function UserBlogView({ users }) {
  const userId = useParams().id;
  const user = users.find((user) => user.id === userId);
  if (!user) return null;
  return (
    <div>
      <h3>{user.name}</h3>
      <h6>added blogs</h6>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
      <li>AS</li>
    </div>
  );
}
