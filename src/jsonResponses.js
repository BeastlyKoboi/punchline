const firebase = require('./firebase.js');
const utils = require('./utils.js');

const getAll = async (request, response) => {
  const data = await firebase.getAll();

  utils.respond(request, response, 200, JSON.stringify(data));
};

const getUser = async (request, response, query) => {
  if (!query.username) {
    utils.respond(request, response, 400, JSON.stringify({
      message: 'Invalid: must provide a username',
    }));
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
    utils.respond(request, response, 400, JSON.stringify({
      message: 'Invalid: must provide a username',
    }));
    return;
  }

  const user = await firebase.getUsername(query.username);

  if (user) {
    utils.respond(request, response, 204);
    return;
  }

  utils.respond(request, response, 404);
};

const getUnusedUsername = async (request, response) => {
  const newUsername = await firebase.getUnusedUsername();
  
  if (newUsername) {
    utils.respond(request, response, 200, JSON.stringify(newUsername));
    return;
  }

  utils.respond(request, response, 500);
};

const getUnusedUsernameHEAD = async (request, response) => {
  const newUsername = await firebase.getUnusedUsername();
  
  if (newUsername) {
    utils.respond(request, response, 204);
    return;
  }

  utils.respond(request, response, 500);
};

const getPrompts = async (request, response, query) => {
  const prompts = await firebase.getPrompts();

  if (prompts) {
    utils.respond(request, response, 200, JSON.stringify(prompts));
    return;
  }

  utils.respond(request, response, 404);
};
const getPromptsHead = async () => {
  const prompts = await firebase.getPrompts();

  if (prompts) {
    utils.respond(request, response, 204);
    return;
  }

  utils.respond(request, response, 404);
};

const addUser = async (request, response, params) => {
  if (!params.username) {
    utils.respond(request, response, 400, JSON.stringify({
      message: 'Invalid: must provide a username',
    }));
    return;
  }

  const user = await firebase.addUsername(params.username);

  utils.respond(request, response, 201, user);
};

const addPrompt = async (request, response, params) => {
  if (!params.text || !params.tags || !params.createdBy) {
    utils.respond(request, response, 400, JSON.stringify({
      message: 'Invalid: must provide the prompts text, tags, and the username of the creator.',
    }));
    return;
  }
  if (await firebase.getUsername(params.createdBy) == null) {
    utils.respond(request, response, 400, JSON.stringify({
      message: 'Invalid: must provide an existing username as a creator.',
    }));
    return;
  }

  const promptKey = await firebase.addPrompt(params.text, params.tags, params.createdBy);

  utils.respond(request, response, 201, promptKey);
};

module.exports = {
  getAll,
  getUser,
  getUserHEAD,
  getUnusedUsername,
  getUnusedUsernameHEAD,
  getPrompts,
  getPromptsHead,
  addUser,
  addPrompt,
};
