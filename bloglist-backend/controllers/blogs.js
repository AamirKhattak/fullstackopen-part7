const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    blog ? response.json(blog) : response.status(404).end();
  } catch (exception) {
    next(exception);
  }
});

blogRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body;

    const { title, author, url, likes } = body;
    if (!title || !url)
      return response
        .status(400)
        .json({ error: "title or url is missing" })
        .end();

    try {
      const user = request.user;
      const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes ? likes : 0,
        user: user.id,
      });

      const savedblog = await blog.save();

      user.blogs = user.blogs.concat(savedblog.id);
      await user.save();

      if (savedblog) response.status(201).json(savedblog);
    } catch (exception) {
      next(exception);
    }
  }
);

blogRouter.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const blogToDeleteId = request.params.id;
      const user = request.user;

      const blog = await Blog.findById(blogToDeleteId);
      if (user.id.toString() === blog.user.toString()) {
        await Blog.findByIdAndRemove(request.params.id);
        return response.status(204).end();
      } else {
        return response
          .status(401)
          .json({ error: "unauthorized to delete this blog" })
          .end();
      }
    } catch (exception) {
      next(exception);
    }
  }
);

blogRouter.put("/:id", async (request, response, next) => {
  const { likes } = request.body;
  if (!likes) return response.status(400).end();
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    ).populate("user");
    response.json(updatedBlog);
  } catch (exception) {
    console.log("exception", exception);
    next(exception);
  }
});

module.exports = blogRouter;
