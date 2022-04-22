const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const helperUser = require('./test_helper_users');
const helper = require('./test_helper_blogs');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const usersInDb = await helperUser.usersInDb();

    const blogToDelete = blogsAtStart[0];
    const user = usersInDb[0];
    // console.log(blogToDelete);
    console.log(user);


    const loggedInUser = await api
      .post('/api/login')
      .send({ username: user.username, password: 'aamirKhattak' })
      .expect(200);

    console.log(loggedInUser);

    const userAuthToken = loggedInUser.body.token;

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'Bearer ' + userAuthToken)
      .expect(204);
  });
});

describe('updation of a blog', () => {
  test('updated blog has correct number of updated likes', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 100 });
    const updatedBlog = response.body;
    expect(updatedBlog.likes).toBe(100);
  });
});

describe('Get requests', () => {
  test('returns correct amount of blog posts in JSON format', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  }, 10000);

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs');
    response.body.map((blog) => expect(blog.id).toBeDefined());
  });
});

describe('POST requests', () => {
  test('successfully creates a new blog post & returns the desired object', async () => {
    const usersInDb = await helperUser.usersInDb();
    const user = usersInDb[0];

    const loggedInUser = await api
      .post('/api/login')
      .send({ username: user.username, password: 'aamirKhattak' })
      .expect(200);

    const userAuthToken = loggedInUser.body.token;

    const newBlog = {
      title: `fullstackopen-part4 ${new Date()}`,
      author: 'Uni of H',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
      likes: 120,
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + userAuthToken)
      .send(newBlog)
      .expect(201);
    const savedBlog = response.body;
    delete savedBlog.id;
    delete savedBlog.user;

    const blogsInDb = await helper.blogsInDb();
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1);
    expect(savedBlog).toEqual(newBlog);
  });

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const usersInDb = await helperUser.usersInDb();
    const user = usersInDb[0];

    const loggedInUser = await api
      .post('/api/login')
      .send({ username: user.username, password: 'aamirKhattak' })
      .expect(200);

    const userAuthToken = loggedInUser.body.token;

    const newBlog = {
      title: 'fullstackopen-part4(withoutlikes)',
      author: 'Uni of H',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + userAuthToken)
      .send(newBlog)
      .expect(201);
    const savedBlog = response.body;
    delete savedBlog.id;

    expect({ likes: savedBlog.likes }).toEqual({ likes: 0 });
  });

  test('if the user info(userId) is missing from the request, the backend responds with bad request', async () => {
   
    const newBlog = {
      title: 'fullstackopen-part4(withoutlikes)',
      author: 'Uni of H',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401);

    expect(response.body.error).toContain('token missing');
  });

  test('if the title and url properties are missing from the request data, the backend responds with bad request ', async () => {
    const usersInDb = await helperUser.usersInDb();
    const user = usersInDb[0];

    const loggedInUser = await api
      .post('/api/login')
      .send({ username: user.username, password: 'aamirKhattak' })
      .expect(200);

    const userAuthToken = loggedInUser.body.token;

    const newBlog = {
      title: 'fullstackopen-part4(withoutlikes)',
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + userAuthToken)
      .send(newBlog)
      .expect(400);

    expect(response.body.error).toContain('title or url is missing');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
