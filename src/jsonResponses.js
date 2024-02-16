const firebase = require('./firebase.js');
const utils = require('./utils.js');

const getAll = async (request, response) => {
  const data = await firebase.getAll();

  utils.respond(request, response, 200, JSON.stringify(data));
};

module.exports = {
  getAll,

};
