import React from 'react';
import Blog from './Blog';

export default function BlogsList({ blogs }) {
  if (!blogs) return null;
  return (
    <div>
      <h3>Blogs</h3>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
