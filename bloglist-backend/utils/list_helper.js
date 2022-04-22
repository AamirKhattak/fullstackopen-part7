const lodash = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  switch (blogs.length) {
  case 0:
    return 0;
  case 1:
    return blogs[0].likes;
  default:
    return blogs.reduce((total, curr) => (total = total + curr.likes), 0);
  }
};

const favoriteBlog = (blogs) => {
  const favBlog = blogs.reduce((mostLiked, curr) =>
    mostLiked.likes < curr.likes ? (mostLiked = curr) : mostLiked
  );
  return { title: favBlog.title, author: favBlog.author, likes: favBlog.likes };
};

const mostBlogs = (blogs) => {
  let blogsGroupBy = lodash.groupBy(blogs, 'author');
  let authorBlogsSum = []; // name of author with total likes of his/her blogs
  lodash.forEach(blogsGroupBy, (value, key) => {
    authorBlogsSum.push({ 'author': key, 'blogs': value.length   });
  });
  let authorWithMostBlogs =  authorBlogsSum.reduce( (p, c) => p.blogs > c.blogs ? p : c);
  return { author:authorWithMostBlogs.author, blogs: authorWithMostBlogs.blogs };
};

const mostLikes = (blogs) => {
  let blogsGroupBy = lodash.groupBy(blogs, 'author');
  let authorLikesSum = []; // name of author with total likes of his/her blogs
  lodash.forEach(blogsGroupBy, (value, key) => {
    authorLikesSum.push({ 'author': key, 'likes':lodash.sumBy(blogsGroupBy[key],'likes') });
  });
  let authorWithMostLikes = authorLikesSum.reduce((p,c) => {
    return p.likes > c.likes ? p : c;
  });
  return { author:authorWithMostLikes.author, likes: authorWithMostLikes.likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
