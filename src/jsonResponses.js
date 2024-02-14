const firebase = require('./firebase.js');

const respond = (request, response, statusCode, content) => {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  if (content) { response.write(content); }
  response.end();
};

const getAll = async (request, response) => {
  const data = await firebase.getAll();
  console.log('In JSON Responses getAll: ', data);

  respond(request, response, 200, JSON.stringify(data));
};

module.exports = {
  getAll,

};
