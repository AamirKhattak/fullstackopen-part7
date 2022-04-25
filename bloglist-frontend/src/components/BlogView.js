import React from 'react';
import { useParams } from 'react-router-dom';

export default function BlogView({ blogs }) {
  const blogId = useParams().id;
  const blog = blogs.find((blog) => blog.id === blogId);

  if (!blog) return null;
  return (
    <div>
      <h3>{blog.title}</h3>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button>likes</button>
      </div>
      <div>added by {blog.author}</div>
    </div>
  );
}
