import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';
import { setNotification } from './notificationReducer';

const initialState = [];

const blogsSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlog(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return state.concat(action.payload);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      );
    },
  },
});

const { setBlog, appendBlog, removeBlog, updateBlog } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    blogs.sort((blogA, blogB) => blogB.likes - blogA.likes);
    dispatch(setBlog(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogsService.remove(id);
      dispatch(removeBlog(id));
    } catch (error) {
      console.log(error.message);
      dispatch(setNotification(error.message));
    }
  };
};

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogsService.update(id, { likes: blog.likes });
    dispatch(updateBlog(updatedBlog));
  };
};

export const newCommentBlog = (blogId, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogsService.addComment(blogId, comment);
    dispatch(updateBlog(updatedBlog));
  };
};

export default blogsSlice.reducer;
