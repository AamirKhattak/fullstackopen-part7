// TODO: Do not save passwords to the database as clear text,
// TODO: Implement a way to see the details of all users by doing a suitable HTTP request.
// TODO:
// TODO:
// TODO:

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const bcrypt = require('bcryptjs');
const User = require('../models/user');
const helper = require('./test_helper_users');

// describe('details of all users', () => {
//     test('list of all users', () => {

//     });
// });

// describe('creating new users:: invalid users are not created', () => {

//     test('both username and password must be given and both must be 3 chars long', () => {

//     });

//     test('the username must be unique', () => {

//     });

// });
describe('creating a new user', () => {
  beforeAll(async () => {
    await User.deleteMany({});
    const initialUsers = await helper.getInitialUsers();
    console.log(initialUsers);
    
    await User.insertMany(initialUsers);

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash }); 
    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();
    // console.log(usersAtStart);
 
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with proper statuscode and message if username/password is missing', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'Superuser',
      password: '12',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username or password is missing');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('creation fails with proper statuscode and message if username/password length is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'Superuser',
      username: 'a',
      password: '1345',
    };

    const responseWithInvalidUsername = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(responseWithInvalidUsername.body.error).toContain(
      'username/password must be 3 or more characters'
    );

    const responseWithInvalidUPassword = await api
      .post('/api/users')
      .send({ ...newUser, username: 'test123', password: '1' })
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(responseWithInvalidUPassword.body.error).toContain(
      'username/password must be 3 or more characters'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

describe('fetching users from db', () => {
  test('getting all users', async () => {
    const usersAtStart = await helper.usersInDb();
    const result = await api.get('/api/users');
    const usersAfterGET = result.body;
    console.log('usersAtStart', usersAtStart);
    console.log('usersAfterGET', usersAfterGET);
    
    expect(usersAfterGET).toEqual(usersAtStart);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
