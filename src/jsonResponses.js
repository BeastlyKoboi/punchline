const request = require('request');
const firebase = require('./firebase.js');
const utils = require('./utils.js');

const getAll = async (request, response) => {
  const data = await firebase.getAll();

  utils.respond(request, response, 200, JSON.stringify(data));
};

const getUser = async (request, response, query) => {
  if (!query.username) {
    utils.respond(request, response, 400);
    return;
  }

  const user = await firebase.getUsername(query.username);

  if (user) {
    utils.respond(request, response, 200, JSON.stringify(user));
    console.log(JSON.stringify(user));
    return;
  }

  utils.respond(request, response, 404);
};
const getUserHEAD = async (request, response, query) => {
  if (!query.username) {
    utils.respond(request, response, 400);
    return;
  }

  const user = await firebase.getUsername(query.username);

  if (user) {
    utils.respond(request, response, 204);
    return;
  }

  utils.respond(request, response, 404);
};

const addUser = async (request, response, query) => {
  const user = await firebase.addUsername(query.username);

  utils.respond(request, response, 201, user);
};

module.exports = {
  getAll,
  getUser,
  getUserHEAD,
  addUser,
};
