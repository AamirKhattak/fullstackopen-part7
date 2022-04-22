const User = require("../models/user");

const bcrypt = require("bcryptjs");

const initialUsers = [
  {
    _id: "5a422a851b54a676234d17f7",
    username: "aamirKhattak",
    name: "Muhammad Aamir Javid",
    password: "aamirKhattak",
    blogs: [
      "5a422a851b54a676234d17f7",
      "5a422ba71b54a676234d17fb",
      "5a422bc61b54a676234d17fc",
    ],
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    username: "test",
    name: "test",
    password: "test",
    blogs: ["5a422aa71b54a676234d17f8"],
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    username: "jondoe",
    name: "jondoe",
    password: "jondoe",
    blogs: ["5a422b3a1b54a676234d17f9"],
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    username: "tiger",
    name: "tiger",
    password: "tiger",
    blogs: ["5a422b891b54a676234d17fa"],
    __v: 0,
  },
];

const getInitialUsers = async() => {
  let users = [];

  for(let i=0; i<initialUsers.length; i++){
    const curr = initialUsers[i];
    const passwordHash = await bcrypt.hash(curr.password, 10);
    const user = {
      ...curr,
      passwordHash,
    };
    users.push(user);
  }
  return users;
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  usersInDb,
  initialUsers,
  getInitialUsers,
};
