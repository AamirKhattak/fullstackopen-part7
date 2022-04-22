const bcrypt = require('bcryptjs');
const userRouter = require('express').Router();
const User = require('../models/user');

const logger = require('../utils/logger');

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 });
    response.json(users);
  } catch (exception) {
    next(exception);
  }
});

userRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id);
    user ? response.json(user) : response.status(404).end();
  } catch (exception) {
    next(exception);
  }
});

userRouter.post('/', async (request, response, next) => {
  //4.15
  //Implement a way to create new users by doing a HTTP POST - request to address api/users.
  //Users have username, password and name.
  const body = request.body;
  const { username, password, name } = body;
  logger.info('POST==> request.body ', body);

  if (username === undefined || password === undefined)
    return response
      .status(400)
      .json({ error: 'username or password is missing' })
      .end();
  if (username.length < 3 || password.length < 3) {
    return response
      .status(400)
      .json({ error: 'username/password must be 3 or more characters' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser)
    return response.status(400).json({ error: 'username must be unique' });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: username,
    passwordHash: passwordHash,
    name: name,
  });

  try {
    const savedUser = await user.save();
    if (savedUser) response.status(201).json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

userRouter.delete('/:id ', async (request, response, next) => {
  try {
    await User.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

// userRouter.put("/:id", async (request, response, next) => {   const {likes} =
// request.body;   if(!likes) return response.status(400).end();   try {
// const updatedUser = await User.findByIdAndUpdate(request.params.id, {likes:
// 100}, {       new: true,     });     response.json(updatedUser);   } catch
// (exception) {     next(exception);   } });

module.exports = userRouter;
